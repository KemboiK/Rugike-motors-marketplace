from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SellerViewSet
from . import views

router = DefaultRouter()
router.register(r'', SellerViewSet, basename='seller')

urlpatterns = [
    path('', include(router.urls)),
    path('add/', views.add_seller, name='add-seller'),
    path('register/', views.register_seller, name='register-seller'),
    path('profile/', views.seller_profile, name='seller-profile'),
    path('register/customer/', views.register_customer, name='register-customer'),
    path('profile/change-password/', views.change_password, name='change-password'),
]