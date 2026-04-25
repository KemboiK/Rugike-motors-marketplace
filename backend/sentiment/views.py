from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from textblob import TextBlob
from .models import SentimentRecord
from .serializers import SentimentRecordSerializer


def analyze_sentiment(message):
    analysis = TextBlob(message)
    polarity = analysis.sentiment.polarity

    if polarity > 0.1:
        sentiment = 'positive'
    elif polarity < -0.1:
        sentiment = 'negative'
    else:
        sentiment = 'neutral'

    confidence = abs(polarity) if abs(polarity) > 0 else 0.5
    return sentiment, round(confidence, 2)


class SentimentAnalysisAPIView(APIView):

    def post(self, request):
        message = request.data.get('message')
        if not message:
            return Response({'error': 'Message is required.'}, status=status.HTTP_400_BAD_REQUEST)

        sentiment, confidence = analyze_sentiment(message)
        record = SentimentRecord.objects.create(
            message=message,
            sentiment=sentiment,
            confidence=confidence
        )
        serializer = SentimentRecordSerializer(record)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        records = SentimentRecord.objects.all().order_by('-analyzed_at')
        serializer = SentimentRecordSerializer(records, many=True)
        return Response(serializer.data)


class SentimentSummaryView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        records = SentimentRecord.objects.all()
        total = records.count()

        if total == 0:
            return Response({
                'total': 0,
                'positive': 0,
                'negative': 0,
                'neutral': 0,
                'positive_percent': 0,
                'negative_percent': 0,
                'neutral_percent': 0,
            })

        positive = records.filter(sentiment='positive').count()
        negative = records.filter(sentiment='negative').count()
        neutral = records.filter(sentiment='neutral').count()

        return Response({
            'total': total,
            'positive': positive,
            'negative': negative,
            'neutral': neutral,
            'positive_percent': round((positive / total) * 100, 1),
            'negative_percent': round((negative / total) * 100, 1),
            'neutral_percent': round((neutral / total) * 100, 1),
        })