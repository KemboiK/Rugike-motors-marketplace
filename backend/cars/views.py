from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from .models import Car
from .serializers import CarSerializer


@api_view(['GET', 'POST'])
def car_list_create(request):
    if request.method == 'GET':
        cars = Car.objects.all()
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data.copy()

        # Automatically assign the logged-in seller
        if not hasattr(request.user, 'seller'):
            return Response({'error': 'Only sellers can add cars'}, status=status.HTTP_403_FORBIDDEN)

        data['seller'] = request.user.seller.id
        data['status'] = 'pending'  # force it to always be pending on creation

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
        serializer = CarSerializer(car)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CarSerializer(car, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        car.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def approve_car(request, pk):
    try:
        car = Car.objects.get(pk=pk)
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)
    
    car.status = 'approved'
    car.save()
    return Response({'status': 'car approved'}, status=status.HTTP_200_OK)

@api_view(['POST'])
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
    cars = Car.objects.filter(seller=seller)
    serializer = CarSerializer(cars, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def download_car_list_pdf(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="car_list.pdf"'

    p = canvas.Canvas(response, pagesize=letter)
    width, height = letter

    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, height - 40, "Car List")

    p.setFont("Helvetica", 10)
    y = height - 70
    cars = Car.objects.all()

    # Table headers
    p.drawString(50, y, "ID")
    p.drawString(100, y, "Make")
    p.drawString(200, y, "Model")
    p.drawString(300, y, "Year")
    p.drawString(350, y, "Price")
    p.drawString(420, y, "Status")
    y -= 20

    for car in cars:
        if y < 50:
            p.showPage()
            y = height - 50
        p.drawString(50, y, str(car.id))
        p.drawString(100, y, car.make)
        p.drawString(200, y, car.model)
        p.drawString(300, y, str(car.year))
        p.drawString(350, y, f"${car.price}")
        p.drawString(420, y, car.status)
        y -= 20

    p.showPage()
    p.save()
    return response