from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_messages, name='get-all-messages'),
    path('send/', views.send_message, name='send-message'),
    path('<int:pk>/', views.get_message, name='get-message'),
    path('<int:pk>/delete/', views.delete_message, name='delete-message'),
]