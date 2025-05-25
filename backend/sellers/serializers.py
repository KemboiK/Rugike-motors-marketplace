from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Seller

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = '__all__'

class SellerCreateSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    name = serializers.CharField()  # add this
    company = serializers.CharField(required=False)  # rename to match model

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=True
        )
        seller = Seller.objects.create(
            user=user,
            name=validated_data['name'],  # set name here
            email=validated_data['email'],  # set email here
            company=validated_data.get("company", ""),
            status="pending"
        )
        return seller

