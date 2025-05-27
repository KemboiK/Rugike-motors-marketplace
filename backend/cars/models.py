from django.db import models
from sellers.models import Seller
from customers.models import Customer
class Car(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='cars')
    name = models.CharField(max_length=255)  # Combined make + model + year as needed
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    @property
    def views_count(self):
        return self.car_views.count()

    @property
    def inquiries_count(self):
        return self.inquiries.count()

class CarView(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='car_views')
    viewed_at = models.DateTimeField(auto_now_add=True)
    # Optional: track viewer IP or user to avoid duplicates

