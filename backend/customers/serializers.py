from rest_framework import serializers
from .models import Customer, Inquiry

class InquirySerializer(serializers.ModelSerializer):
    car_name = serializers.CharField(source='car.name', read_only=True)

    class Meta:
        model = Inquiry
        fields = ['id', 'car', 'car_name', 'message', 'created_at']

class CustomerSerializer(serializers.ModelSerializer):
    inquiries_count = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    joinDate = serializers.DateTimeField(source='joined_at', format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'phone', 'address', 'inquiries_count', 'status', 'joinDate', 'is_active']

    def get_inquiries_count(self, obj):
        return obj.inquiries.count()

    def get_status(self, obj):
        return "active" if obj.is_active else "inactive"