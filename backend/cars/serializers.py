from rest_framework import serializers
from .models import Car
from customers.models import Inquiry
class CarSerializer(serializers.ModelSerializer):
    views = serializers.IntegerField(source='views_count', read_only=True)
    inquiries = serializers.IntegerField(source='inquiries_count', read_only=True)    
    class Meta:
        model = Car
        fields = '__all__'
        
    def get_inquiries(self, obj):
        return Inquiry.objects.filter(car=obj).count()