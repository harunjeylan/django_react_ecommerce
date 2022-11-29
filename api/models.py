from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.name}" 

class Image(models.Model):
    image = models.ImageField(null=True, blank=True, upload_to="product-images")
    def __str__(self):
        return f"{self.image.name}"


class Product(models.Model):
    name = models.CharField(max_length=100)
    short_description = models.TextField(max_length=300,null=True, blank=True)
    long_description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.FloatField()
    images = models.ManyToManyField(Image, blank=True)
    def __str__(self):
        return f"{self.name}"


class Order(models.Model):
    username = models.CharField(max_length=191)
    products = models.ManyToManyField(Product, blank=True)
    email = models.EmailField()
    def __str__(self):
        return f"{self.username: self.email}"
