from django.urls import path
from .views import SentimentAnalysisAPIView

urlpatterns = [
    path("analyze/", SentimentAnalysisAPIView.as_view(), name="analyze-sentiment"),
]
