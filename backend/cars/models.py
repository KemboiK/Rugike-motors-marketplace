from django.db import models
from sellers.models import Seller

class Car(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    TRANSMISSION_CHOICES = [
        ('automatic', 'Automatic'),
        ('manual', 'Manual'),
    ]

    FUEL_TYPE_CHOICES = [
        ('gasoline', 'Gasoline'),
        ('diesel', 'Diesel'),
        ('electric', 'Electric'),
        ('hybrid', 'Hybrid'),
    ]

    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='cars')
    name = models.CharField(max_length=255)
    make = models.CharField(max_length=100, default='Unknown')
    model = models.CharField(max_length=100, default='Unknown')
    year = models.PositiveIntegerField(default=2000)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    mileage = models.PositiveIntegerField(default=0)
    color = models.CharField(max_length=50, default='Unknown')
    transmission = models.CharField(max_length=10, choices=TRANSMISSION_CHOICES, default='automatic')
    fuel_type = models.CharField(max_length=10, choices=FUEL_TYPE_CHOICES, default='gasoline')
    description = models.TextField(blank=True, default='')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    phone = models.CharField(max_length=20, blank=True, default='')
    whatsapp = models.CharField(max_length=20, blank=True, default='')
    instagram = models.CharField(max_length=100, blank=True, default='')
    twitter = models.CharField(max_length=100, blank=True, default='')
    snapchat = models.CharField(max_length=100, blank=True, default='')

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

    @property
    def views_count(self):
        return self.car_views.count()

    @property
    def inquiries_count(self):
        return self.inquiries.count()


class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='cars/images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.car.name}"


class CarFeature(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='features')
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.car.name}"


class CarView(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='car_views')
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    viewed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"View on {self.car.name} at {self.viewed_at}"