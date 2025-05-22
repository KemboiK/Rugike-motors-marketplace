from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Seller
from .serializers import SellerSerializer

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
