from rest_framework import serializers
from .models import Car
class CarSerializer(serializers.ModelSerializer):
    views = serializers.IntegerField(source='views_count', read_only=True)
    inquiries = serializers.IntegerField(source='inquiries_count', read_only=True)    
    class Meta:
        model = Car
        fields = '__all__'

    def get_views(self, obj):
        return getattr(obj, 'views_count', 0)  # safely fallback to 0

    def get_inquiries(self, obj):
        from customers.models import Inquiry 
        return Inquiry.objects.filter(car=obj).count()