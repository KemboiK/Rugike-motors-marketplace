from django.db import models
from django.contrib.auth.models import User

class Seller(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='seller')
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    company = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    total_cars = models.PositiveIntegerField(default=0)
    join_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
