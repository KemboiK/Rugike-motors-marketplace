from django.contrib import admin
from .models import Car

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "seller", "status", "created_at")
    list_filter = ("status", "seller")
    search_fields = ("name", "seller__name")
