from django.db import models

# Create your models here.

class SentimentRecord(models.Model):
    message = models.TextField()
    sentiment = models.CharField(max_length=20)  # e.g., positive, neutral, negative
    confidence = models.FloatField()  # model's confidence in prediction
    analyzed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sentiment} ({self.confidence:.2f}) - {self.message[:30]}"

