from django.db import models
from django.contrib.auth.models import  User

# Create your models here.
    
class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=50, null=True,blank=True)
    street1 = models.CharField(max_length=100, null=True,blank=True)
    street2 = models.CharField(max_length=100, null=True,blank=True)
    city = models.CharField(max_length=100, null=True,blank=True)
    zipcode = models.CharField(max_length=100, null=True,blank=True)
    state = models.CharField(max_length=100, null=True,blank=True)
    def __str__(self):
        return f"{self.user.get_full_name}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(null=True, blank=True, upload_to="profile-images")
    def __str__(self):
        return f"{self.user.get_full_name}"
