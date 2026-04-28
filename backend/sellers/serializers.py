from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Seller


class SellerSerializer(serializers.ModelSerializer):
    total_cars = serializers.SerializerMethodField()
    joinDate = serializers.DateField(source='join_date', read_only=True)

    class Meta:
        model = Seller
        fields = [
            'id', 'name', 'email', 'company', 'phone',
            'website', 'address', 'bio', 'status',
            'total_cars', 'joinDate'
        ]

    def get_total_cars(self, obj):
        return obj.cars.count()


class SellerCreateSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    name = serializers.CharField()
    company = serializers.CharField(required=False, default='')
    phone = serializers.CharField(required=False, default='')

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use.")
        return value

    def create(self, validated_data):
        # 🔥 IMPORTANT: user cannot login yet
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=False
        )

        seller = Seller.objects.create(
            user=user,
            name=validated_data['name'],
            email=validated_data['email'],
            company=validated_data.get('company', ''),
            phone=validated_data.get('phone', ''),
            status='pending'
        )

        return seller


class SellerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ['name', 'email', 'company', 'phone', 'website', 'address', 'bio']