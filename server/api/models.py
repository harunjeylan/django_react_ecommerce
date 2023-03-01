from django.db import models
from django.contrib.auth.models import  User

# Create your models here.

class Category(models.Model):
    name = models.CharField(unique=True,max_length=100)
    def __str__(self):
        return f"{self.name}" 
class Vendor(models.Model):
    name = models.CharField(unique=True,max_length=100)
    def __str__(self):
        return f"{self.name}" 
class Collection(models.Model):
    name = models.CharField(unique=True,max_length=100)
    def __str__(self):
        return f"{self.name}" 

class Tag(models.Model):
    name = models.CharField(unique=True,max_length=100)
    def __str__(self):
        return f"{self.name}" 


class Option(models.Model):
    label = models.CharField(unique=True, max_length=100)
    def __str__(self):
        return f"{self.label}" 


class Variant(models.Model):
    label = models.CharField(max_length=100)
    options = models.ManyToManyField(Option)
    def __str__(self):
        return f"{self.label}" 


class VariantOption(models.Model):
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.variant} -> {self.option}" 

class Image(models.Model):
    image = models.ImageField(null=True, blank=True, upload_to="product-images")
    def __str__(self):
        return f"{self.image.name}"


class Organize(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    collection = models.ForeignKey(Collection,null=True, blank=True, on_delete=models.SET_NULL)
    vendor = models.ForeignKey(Vendor,null=True, blank=True, on_delete=models.SET_NULL)
    tags = models.ManyToManyField(Tag)

class Product(models.Model):
    title = models.CharField(max_length=100)
    brand = models.CharField(max_length=100,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True, upload_to="product-images")
    organize = models.ForeignKey(Organize, on_delete=models.SET_NULL, null=True, blank=True)
    images = models.ManyToManyField(Image, blank=True)
    variants = models.ManyToManyField(VariantOption, blank=True)
    date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title}"

class Country(models.Model):
    name = models.CharField(max_length=40)
    code = models.CharField(unique=True,max_length=10)
    def __str__(self):
        return f"{self.name}"

class Inventory(models.Model):
    regular_pricing = models.FloatField()
    sale_pricing = models.FloatField()
    stock = models.FloatField()
    SHOPPING_TYPES = [
        ("fulfilled_by_seller","Fulfilled by Seller" ),
        ("fulfilled_by_phoenix","Fulfilled by Phoenix" )
    ]
    shipping_type = models.CharField(choices=SHOPPING_TYPES,default="fulfilled_by_seller", max_length=25,)
    GLOBAL_DELIVERY = [
        ("worldwide_delivery","Worldwide Delivery"),
        ("selected_countries","Selected Countries"),
        ("local_delivery","Local Delivery")
    ]
    global_delivery = models.CharField(choices=GLOBAL_DELIVERY,default="worldwide_delivery",max_length=25,)
    
    fragile_product = models.BooleanField(default=False,blank=True)
    max_allowed_temperature = models.CharField(null=True, blank=True,max_length=25,)
    
    biodegradable = models.BooleanField(default=False,blank=True)
    frozen_product = models.BooleanField(default=False,blank=True)
    expiry_date  = models.DateField(null=True, blank=True)

    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    countries = models.ManyToManyField(Country,blank=True)
    def __str__(self):
        return f"{self.product.title}"

class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    products = models.ManyToManyField(Product, blank=True)
    email = models.EmailField()
    FULFILLMENT_STATUS = [
        ("complete","Complete"),
        ("failed","Failed"),
        ("cancelled","Cancelled"),
        ("complete","Complete"),
        ("pending","Pending"),
        ("partially_fulfilled","Partially Fulfilled"),
        
    ]
    fulfillment_status = models.CharField(choices=FULFILLMENT_STATUS,default="pending" ,max_length=25)
    DELIVERY_TYPE=[
        ("worldwide_delivery","Worldwide Delivery"),
        ("selected_countries","Selected Countries"),
        ("local_delivery","Local Delivery")
    ]
    delivery_type = models.CharField(choices=DELIVERY_TYPE,default="local_delivery",max_length=25)
    countries = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.get_full_name: self.date}"

class WishList(models.Model):
    customer = models.OneToOneField(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    def __str__(self):
        return f"{self.customer.get_full_name: self.date}"
