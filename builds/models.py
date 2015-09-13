from django.db import models

# Create your models here.

class Build(models.Model):
  build_location = models.CharField(max_length=200)
