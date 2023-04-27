from rest_framework import serializers
from django.contrib.auth.models import  User
import django.contrib.auth.password_validation as validators


from service.models import (
    Image,
    Review,
    Vendor,
    Category,
    Collection,
    Tag,
    Option,
    Variant,
    VariantOption,
    Image,
    Organize,
    Discount,
    Country,
    Brand,
    OrderAddress,
    Order, 
    OrderdItem,
    OrderdVariantOption,
    Contact,
    Subscriber,
    Fqa,
)

class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = Image
        fields = "__all__"
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = "__all__"
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = "__all__"
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"
class DiscountSerializer(serializers.ModelSerializer):
    start_date =  serializers.DateField(format="%d-%m-%Y", input_formats=['%d-%m-%Y', 'iso-8601'])
    end_date =  serializers.DateField(format="%d-%m-%Y", input_formats=['%d-%m-%Y', 'iso-8601'])
    class Meta:
        model = Discount
        fields = "__all__"
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = "__all__"
class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant
        fields = "__all__"
class VariantOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantOption
        fields = "__all__"
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"
class OrganizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organize
        fields = "__all__"
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"


class OrderAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAddress
        fields = "__all__"
class OrderdVariantOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderdVariantOption
        fields = "__all__"


class OrderdItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderdItem
        fields = "__all__"
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


      
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = "__all__"

class FqaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fqa
        fields = "__all__"
