import os

from django.db import models
from django.utils import timezone


# Create your models here.

def document_upload_to(instance, filename):
    # Generate the new filename with a timestamp
    base, ext = os.path.splitext(filename)
    timestamp = timezone.now().strftime("%Y-%m-%d_%H-%M")
    new_filename = f"{base}_{timestamp}{ext}"
    return os.path.join('documents/', new_filename)


class Documents(models.Model):
    name = models.CharField(max_length=255)
    content = models.TextField()
    file = models.FileField(upload_to=document_upload_to)
    created_at = models.DateTimeField(auto_now_add=True)
    size = models.IntegerField(default=0)

    def __str__(self):
        return self.name
