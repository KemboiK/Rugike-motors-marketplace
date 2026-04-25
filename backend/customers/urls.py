from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import CustomerViewSet

router = DefaultRouter()
router.register(r'', CustomerViewSet, basename='customer')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/activate/', views.activate_customer, name='activate-customer'),
    path('<int:pk>/deactivate/', views.deactivate_customer, name='deactivate-customer'),
    path('my/inquiries/', views.my_inquiries, name='my-inquiries'),
    path('export/pdf/', views.download_customer_list_pdf, name='export-customer-pdf'),
]