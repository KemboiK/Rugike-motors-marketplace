from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import CustomerViewSet

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('export_pdf/', views.download_customer_list_pdf, name='export_customer_list_pdf'),
]
