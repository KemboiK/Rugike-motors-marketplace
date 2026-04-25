from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from cars.models import Car
from customers.models import Customer
from sellers.models import Seller
from django.db.models import Sum


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_stats(request):
    total_cars = Car.objects.filter(status='approved').count()
    total_customers = Customer.objects.count()
    total_sellers = Seller.objects.count()
    total_revenue = Car.objects.filter(status='approved').aggregate(
        total=Sum('price')
    )['total'] or 0

    pending_cars = Car.objects.filter(status='pending').count()
    active_sellers = Seller.objects.filter(status='active').count()
    active_customers = Customer.objects.filter(is_active=True).count()

    return Response({
        'total_cars': total_cars,
        'total_customers': total_customers,
        'total_sellers': total_sellers,
        'total_revenue': float(total_revenue),
        'pending_cars': pending_cars,
        'active_sellers': active_sellers,
        'active_customers': active_customers,
    })