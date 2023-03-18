from rest_framework import serializers
from django.contrib.auth.models import  User
import django.contrib.auth.password_validation as validators

from api.models import (
    Order, 
    Product, 
    Image,
    RecommendedProduct,
    Vendor,
    Category,
    Collection,
    Tag,
    Option,
    Variant,
    VariantOption,
    Image,
    Organize,
    Country,
    Inventory,
    WishList,
    Brand,
    Review,
    OrderAddress,
    OrderdProduct,
    OrderdVariantOption,
)


class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = Image
        fields = "__all__"



class ProductSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = Product
        fields = "__all__"
class ReviewAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id","product", "first_name", "last_name", "description", "rating", "created"]

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
class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = "__all__"

class WishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = "__all__"
class RecommendedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecommendedProduct
        fields = "__all__"

class OrderAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAddress
        fields = "__all__"
class OrderdVariantOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderdVariantOption
        fields = "__all__"


class OrderdProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderdProduct
        fields = "__all__"
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
