from django.urls import path
from . import views

urlpatterns = [
    path('', views.car_list_create, name='car-list-create'),
    path('<int:pk>/', views.car_detail, name='car-detail'),
    path('<int:pk>/approve/', views.approve_car, name='approve-car'),
    path('<int:pk>/reject/', views.reject_car, name='reject-car'),
    path('my/', views.my_cars, name='my-cars'),
    path('download/pdf/', views.download_car_list_pdf, name='download-car-list-pdf'),
    path('<int:car_id>/inquire/', views.submit_inquiry, name='submit-inquiry'),
    path('all/', views.PublicCarListView.as_view(), name='public-car-list'),
    path('all/<int:pk>/', views.PublicCarDetailView.as_view(), name='public-car-detail'),


]
