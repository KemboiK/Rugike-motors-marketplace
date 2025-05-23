from django.urls import path
from . import views

urlpatterns = [
    path('', views.car_list_create, name='car-list-create'),
    path('<int:pk>/', views.car_detail, name='car-detail'),
    path('<int:pk>/approve/', views.approve_car, name='approve-car'),
    path('<int:pk>/reject/', views.reject_car, name='reject-car'),
]
