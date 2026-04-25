from django.db import models

class UserMessage(models.Model):
    CONTACT_METHOD_CHOICES = [
        ('email', 'Email'),
        ('phone', 'Phone'),
        ('whatsapp', 'WhatsApp'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, default='')
    subject = models.CharField(max_length=255)
    message = models.TextField()
    car_id = models.IntegerField(null=True, blank=True)
    preferred_contact = models.CharField(
        max_length=10, 
        choices=CONTACT_METHOD_CHOICES, 
        default='email'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.subject}"