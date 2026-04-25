from django.urls import path
from .views import SentimentAnalysisAPIView, SentimentSummaryView

urlpatterns = [
    path('analyze/', SentimentAnalysisAPIView.as_view(), name='analyze-sentiment'),
    path('summary/', SentimentSummaryView.as_view(), name='sentiment-summary'),
]