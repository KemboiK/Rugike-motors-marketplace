from rest_framework import viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Seller
from .serializers import SellerSerializer, SellerCreateSerializer, SellerUpdateSerializer


class SellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer
    permission_classes = [IsAdminUser]

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        seller = self.get_object()
        seller.status = 'active'
        seller.save()
        return Response({'status': 'seller approved'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def activate(self, request, pk=None):
        seller = self.get_object()
        seller.status = 'active'
        seller.save()
        return Response({'status': 'seller activated'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def deactivate(self, request, pk=None):
        seller = self.get_object()
        seller.status = 'inactive'
        seller.save()
        return Response({'status': 'seller deactivated'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register_seller(request):
    serializer = SellerCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Seller registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_customer(request):
    from customers.models import Customer
    from django.contrib.auth.models import User

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    name = request.data.get('name')
    phone = request.data.get('phone', '')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already in use'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    Customer.objects.create(user=user, name=name, email=email, phone=phone)

    return Response({'message': 'Customer registered successfully'}, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def seller_profile(request):
    if not hasattr(request.user, 'seller'):
        return Response({'error': 'Only sellers can access this'}, status=status.HTTP_403_FORBIDDEN)

    seller = request.user.seller

    if request.method == 'GET':
        serializer = SellerSerializer(seller)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SellerUpdateSerializer(seller, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_seller(request):
    serializer = SellerCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Seller added successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')

    if not user.check_password(current_password):
        return Response({'error': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()
    return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)