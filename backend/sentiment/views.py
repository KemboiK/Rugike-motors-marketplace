from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SentimentRecord
from .serializers import SentimentRecordSerializer
import random

# Simple mock sentiment analyzer
def analyze_sentiment(message):
    message_lower = message.lower()
    if "happy" in message_lower or "great" in message_lower:
        return "positive", random.uniform(0.8, 1.0)
    elif "bad" in message_lower or "terrible" in message_lower:
        return "negative", random.uniform(0.8, 1.0)
    else:
        return "neutral", random.uniform(0.5, 0.7)

class SentimentAnalysisAPIView(APIView):
    def post(self, request):
        message = request.data.get("message")
        if not message:
            return Response({"error": "Message is required."}, status=status.HTTP_400_BAD_REQUEST)

        sentiment, confidence = analyze_sentiment(message)
        record = SentimentRecord.objects.create(
            message=message,
            sentiment=sentiment,
            confidence=confidence
        )
        serializer = SentimentRecordSerializer(record)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        records = SentimentRecord.objects.all().order_by("-analyzed_at")
        serializer = SentimentRecordSerializer(records, many=True)
        return Response(serializer.data)
