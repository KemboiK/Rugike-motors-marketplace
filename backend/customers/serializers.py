from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    inquiries = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    joinDate = serializers.DateTimeField(source='joined_at', format="%Y-%m-%d")

    class Meta:
        model = Customer
        fields = ['id', 'name', 'email', 'inquiries', 'status', 'joinDate']

    def get_inquiries(self, obj):
        return obj.inquiries.count()  # uses the related_name in the Inquiry model

    def get_status(self, obj):
        return "active" if obj.is_active else "inactive"
