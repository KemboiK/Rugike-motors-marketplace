from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
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
