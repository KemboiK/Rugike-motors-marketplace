from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    views_count = serializers.SerializerMethodField()
    inquiries_count = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = '__all__'

    def get_views_count(self, obj):
        # Use annotated value if present, otherwise fall back to property
        return getattr(obj, 'annotated_views', obj.car_views.count())

    def get_inquiries_count(self, obj):
        return getattr(obj, 'annotated_inquiries', obj.inquiries.count())
