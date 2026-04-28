from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import SellerViewSet
from . import views

router = DefaultRouter()
router.register(r'manage', SellerViewSet, basename='seller')

urlpatterns = [
    *router.urls,
    path('register/', views.register_seller, name='register-seller'),
    path('register/customer/', views.register_customer, name='register-customer'),
    path('add/', views.add_seller, name='add-seller'),
    path('profile/', views.seller_profile, name='seller-profile'),
    path('profile/change-password/', views.change_password, name='change-password'),
]