from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.postgres.fields import JSONField, ArrayField

class Image(models.Model):
    class Meta:
        db_table = "image"
    
    id = models.CharField(primary_key=True, max_length=255)
    file = models.ImageField(upload_to="static/images")
    height = models.FloatField()
    width = models.FloatField()
    inserted_at = models.DateTimeField(default=timezone.now)
    manual_labelled = models.BooleanField(default=False)

class Box(models.Model):
    class Meta:
        db_table = "box"
    
    image = models.ForeignKey(Image, on_delete=models.SET_NULL, blank=True, null=True)
    x = models.FloatField()
    y = models.FloatField()
    height = models.FloatField()
    width = models.FloatField()
    label = models.CharField(max_length=100, blank=True, null=True)
    probability = models.FloatField(blank=True, null=True)
    inserted_at = models.DateTimeField(default=timezone.now)
