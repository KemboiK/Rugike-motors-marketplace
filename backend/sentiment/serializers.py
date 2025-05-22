from rest_framework import serializers
from .models import SentimentRecord

class SentimentRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentimentRecord
        fields = "__all__"
