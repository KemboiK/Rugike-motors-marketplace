from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from django.http import HttpResponse
from django.db.models import Count
from .models import Car, CarView, CarImage, CarFeature
from customers.models import Inquiry
from .serializers import CarSerializer


@api_view(['GET', 'POST'])
def car_list_create(request):
    if request.method == 'GET':
        cars = Car.objects.all().annotate(
            annotated_views=Count('car_views'),
            annotated_inquiries=Count('inquiries')
        )
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        if not hasattr(request.user, 'seller'):
            return Response({'error': 'Only sellers can add cars'}, status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data['seller'] = request.user.seller.id
        data['status'] = 'pending'

        serializer = CarSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def car_detail(request, pk):
    try:
        car = Car.objects.get(pk=pk)
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Track view with IP
        ip = request.META.get('REMOTE_ADDR')
        CarView.objects.create(car=car, ip_address=ip)
        car = Car.objects.filter(pk=pk).annotate(
            annotated_views=Count('car_views'),
            annotated_inquiries=Count('inquiries')
        ).first()
        serializer = CarSerializer(car)
        return Response(serializer.data)

    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        # Only the seller who owns the car or admin can update
        if not request.user.is_staff and (not hasattr(request.user, 'seller') or car.seller != request.user.seller):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        serializer = CarSerializer(car, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        # Only the seller who owns the car or admin can delete
        if not request.user.is_staff and (not hasattr(request.user, 'seller') or car.seller != request.user.seller):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        car.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def approve_car(request, pk):
    try:
        car = Car.objects.get(pk=pk)
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)

    car.status = 'approved'
    car.save()
    return Response({'status': 'car approved'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def reject_car(request, pk):
    try:
        car = Car.objects.get(pk=pk)
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)

    car.status = 'rejected'
    car.save()
    return Response({'status': 'car rejected'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_cars(request):
    if not hasattr(request.user, 'seller'):
        return Response({'error': 'Only sellers can view their cars'}, status=status.HTTP_403_FORBIDDEN)

    seller = request.user.seller
    cars = Car.objects.filter(seller=seller).annotate(
        annotated_views=Count('car_views'),
        annotated_inquiries=Count('inquiries')
    )
    serializer = CarSerializer(cars, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_inquiry(request, car_id):
    try:
        car = Car.objects.get(pk=car_id)
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)

    if not hasattr(request.user, 'customer'):
        return Response({'error': 'Only customers can submit inquiries'}, status=status.HTTP_403_FORBIDDEN)

    Inquiry.objects.create(
        car=car,
        customer=request.user.customer,
        message=request.data.get('message', '')
    )
    return Response({'message': 'Inquiry submitted successfully'}, status=status.HTTP_201_CREATED)


class PublicCarListView(ListAPIView):
    queryset = Car.objects.filter(status='approved').annotate(
        annotated_views=Count('car_views'),
        annotated_inquiries=Count('inquiries')
    )
    serializer_class = CarSerializer
    permission_classes = []


class PublicCarDetailView(RetrieveAPIView):
    queryset = Car.objects.filter(status='approved').annotate(
        annotated_views=Count('car_views'),
        annotated_inquiries=Count('inquiries')
    )
    serializer_class = CarSerializer
    permission_classes = []


@api_view(['GET'])
@permission_classes([IsAdminUser])
def download_car_list_pdf(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="car_list.pdf"'

    doc = SimpleDocTemplate(response, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("Car List", styles['Title']))
    elements.append(Spacer(1, 12))

    data = [['ID', 'Name', 'Price', 'Status']]
    cars = Car.objects.all()
    for car in cars:
        data.append([str(car.id), car.name, f"${car.price:.2f}", car.status.capitalize()])

    table = Table(data, colWidths=[50, 250, 80, 80])
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#d5dae6')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
        ('ALIGN', (2, 1), (2, -1), 'RIGHT'),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('GRID', (0, 0), (-1, -1), 0.8, colors.grey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f0f0f0')]),
    ])
    table.setStyle(style)
    elements.append(table)

    doc.build(elements)
    return response