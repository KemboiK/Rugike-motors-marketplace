from django.urls import path
from .views import car_list_create

urlpatterns = [
    path('', car_list_create, name='car-list-create'),
]
