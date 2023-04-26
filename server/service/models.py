from django.db import models
from django.contrib.auth.models import  User
from django.core.validators import RegexValidator
# Create your models here.
class Category(models.Model):
    name = models.CharField(unique=True,max_length=100)
    def get_blogs(self):
        return self.blog_set.all()
       
    def get_published_blogs(self):
        return self.blog_set.filter(status="published")
    
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
    def get_blogs(self):
        return self.blog_set.all()
       
    def get_published_blogs(self):
        return self.blog_set.filter(status="published")
    
    def __str__(self):
        return f"{self.name}" 

class Brand(models.Model):
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
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE)
    options = models.ManyToManyField(Option)
    def __str__(self):
        return f"{self.variant}" 

class Image(models.Model):
    image = models.ImageField(null=True, blank=True, upload_to="product-images")
    def __str__(self):
        return f"{self.image.name}"


class Organize(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    collection = models.ForeignKey(Collection,null=True, blank=True, on_delete=models.SET_NULL)
    vendor = models.ForeignKey(Vendor,null=True, blank=True, on_delete=models.SET_NULL)
    tags = models.ManyToManyField(Tag)

class Discount(models.Model):
    name = models.CharField(max_length=100)
    start_date =  models.DateField()
    end_date =  models.DateField()
    amount = models.FloatField()
    def __str__(self):
        return f"{self.name} -> {self.amount}%"
    

class Country(models.Model):
    name = models.CharField(max_length=40)
    code = models.CharField(unique=True,max_length=10)
    def __str__(self):
        return f"{self.name}"

    

class OrderAddress(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    PHONE_REGEX = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[PHONE_REGEX], max_length=17, null=True,blank=True)
    email = models.EmailField(max_length=100)
    country = models.CharField(max_length=50, null=True,blank=True)
    street1 = models.CharField(max_length=100, null=True,blank=True)
    street2 = models.CharField(max_length=100, null=True,blank=True)
    city = models.CharField(max_length=100, null=True,blank=True)
    zipcode = models.CharField(max_length=100, null=True,blank=True)
    state = models.CharField(max_length=100, null=True,blank=True)
    def __str__(self):
        return f"{self.street1} | {self.city} | {self.state}"

class OrderdVariantOption(models.Model):
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.variant}" 
    
class OrderdItem(models.Model):
    variants = models.ManyToManyField(OrderdVariantOption, blank=True)
    count = models.IntegerField(default=1)
    def __str__(self):
        return f"{self.product}" 
    
class Order(models.Model):
    items = models.ManyToManyField(OrderdItem, blank=True)
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    billing_address=models.ForeignKey(OrderAddress,related_name="order_billing_address", on_delete=models.SET_NULL, null=True)
    shipping_address=models.ForeignKey(OrderAddress, related_name="order_shipping_address", on_delete=models.SET_NULL, null=True)
    FULFILLMENT_STATUS = [
        ("complete","Complete"),
        ("failed","Failed"),
        ("cancelled","Cancelled"),
        ("pending","Pending"),
    ]
    fulfillment_status = models.CharField(choices=FULFILLMENT_STATUS,default="pending" ,max_length=25)
    DELIVERY_TYPE=[
        ("worldwide_delivery","Worldwide Delivery"),
        ("selected_countries","Selected Countries"),
        ("local_delivery","Local Delivery")
    ]
    delivery_type = models.CharField(choices=DELIVERY_TYPE,default="local_delivery",max_length=25, null=True, blank=True)
    DELIVERY_METHOD=[
        ("none","NONE"),
        ("ppl","PPL"),
        ("ups","UPS"),
        ("dhl","SHL"),
        ("usps","Usps next day"),
    ]
    delivery_method = models.CharField(choices=DELIVERY_METHOD,default="none",max_length=25)
    total_price = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.customer.get_full_name()}: {self.date}"


class Review(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    PHONE_REGEX = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(validators=[PHONE_REGEX], max_length=17, null=True,blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.SmallIntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.first_name} {self.last_name}-> {self.rating}: {self.product}"


class Comment(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["-created"]
    
    def __str__(self):
        return f'{self.first_name} {self.last_name} -> {self.blog.title}'


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    def __str__(self):
        return f'{self.email}'
    
