from django.contrib import admin

# Register your models here.
from .models import SentimentRecord

@admin.register(SentimentRecord)
class SentimentRecordAdmin(admin.ModelAdmin):
    list_display = ("message", "sentiment", "confidence", "analyzed_at")
    search_fields = ("message", "sentiment")
    list_filter = ("sentiment", "analyzed_at")
