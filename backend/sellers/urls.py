from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SellerViewSet, add_seller

router = DefaultRouter()
router.register(r'sellers', SellerViewSet, basename='seller')

urlpatterns = [
    path('', include(router.urls)),
    path('add/', add_seller, name='add-seller'),
]
