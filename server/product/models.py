from django.db import models
from django.contrib.auth.models import  User

class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True, upload_to="product-images")
    date = models.DateField(auto_now_add=True)
    regular_pricing = models.FloatField()
    sale_pricing = models.FloatField()
    stock = models.FloatField()

    fragile_product = models.BooleanField(default=False,blank=True)
    max_allowed_temperature = models.CharField(null=True, blank=True,max_length=25,)
    biodegradable = models.BooleanField(default=False,blank=True)
    frozen_product = models.BooleanField(default=False,blank=True)
    expiry_date  = models.DateField(null=True, blank=True)

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

    brand = models.ForeignKey("service.Brand", on_delete=models.SET_NULL, null=True, blank=True)
    discount = models.ForeignKey("service.Discount", null=True, blank=True, on_delete=models.SET_NULL)
    organize = models.ForeignKey("service.Organize", null=True, blank=True, on_delete=models.SET_NULL)
    countries = models.ManyToManyField("service.Country",blank=True)
    images = models.ManyToManyField("service.Image", blank=True)
    orderd = models.ManyToManyField("service.OrderdItem",blank=True)
    variants = models.ManyToManyField("service.VariantOption", blank=True)
    reviews = models.ManyToManyField("service.Review", blank=True)
    wishes = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return f"{self.title}"



