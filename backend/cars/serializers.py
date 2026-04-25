from rest_framework import serializers
from .models import Car, CarImage, CarFeature

class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ['id', 'image', 'uploaded_at']

class CarFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarFeature
        fields = ['id', 'name']

class CarSerializer(serializers.ModelSerializer):
    views_count = serializers.SerializerMethodField()
    inquiries_count = serializers.SerializerMethodField()
    images = CarImageSerializer(many=True, read_only=True)
    features = CarFeatureSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    feature_list = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )

    class Meta:
        model = Car
        fields = '__all__'

    def get_views_count(self, obj):
        return getattr(obj, 'annotated_views', obj.car_views.count())

    def get_inquiries_count(self, obj):
        return getattr(obj, 'annotated_inquiries', obj.inquiries.count())

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        feature_list = validated_data.pop('feature_list', [])

        car = Car.objects.create(**validated_data)

        for image in uploaded_images:
            CarImage.objects.create(car=car, image=image)

        for feature in feature_list:
            CarFeature.objects.create(car=car, name=feature)

        return car

    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        feature_list = validated_data.pop('feature_list', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if uploaded_images:
            instance.images.all().delete()
            for image in uploaded_images:
                CarImage.objects.create(car=instance, image=image)

        if feature_list:
            instance.features.all().delete()
            for feature in feature_list:
                CarFeature.objects.create(car=instance, name=feature)

        return instance