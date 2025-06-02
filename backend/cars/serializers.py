from rest_framework import serializers
from .models import Car
from customers.models import Inquiry

class CarSerializer(serializers.ModelSerializer):
    views = serializers.SerializerMethodField()
    inquiries = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = '__all__'

    def get_views(self, obj):
        return obj.carview_set.count()

    def get_inquiries(self, obj):
        return Inquiry.objects.filter(car=obj).count()
