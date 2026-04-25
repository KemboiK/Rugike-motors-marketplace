from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        # Determine role
        if user.is_staff or user.is_superuser:
            role = 'admin'
        elif hasattr(user, 'seller'):
            role = 'seller'
        elif hasattr(user, 'customer'):
            role = 'customer'
        else:
            role = 'unknown'

        # Add extra info to response
        data['role'] = role
        data['username'] = user.username
        data['email'] = user.email
        data['id'] = user.id

        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer