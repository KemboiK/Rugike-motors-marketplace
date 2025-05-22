from django.contrib import admin

# Register your models here.
from .models import Car

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ("make", "model", "year", "price", "seller", "is_available", "created_at")
    list_filter = ("is_available", "year", "make")
    search_fields = ("make", "model", "seller__name")
