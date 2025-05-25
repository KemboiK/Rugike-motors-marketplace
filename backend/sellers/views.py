from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Seller
from .serializers import SellerSerializer, SellerCreateSerializer

class SellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer

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
@permission_classes([IsAdminUser])
def add_seller(request):
    serializer = SellerCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Seller added successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)