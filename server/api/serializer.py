from rest_framework import serializers
from django.contrib.auth.models import  User
import django.contrib.auth.password_validation as validators

from api.models import (
    Order, 
    Product, 
    Image,
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
    WishList
    )


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"



class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Product
        fields = "__all__"
class VendorSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Vendor
        fields = "__all__"
class CategorySerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Category
        fields = "__all__"
class CollectionSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Collection
        fields = "__all__"
class TagSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Tag
        fields = "__all__"
class OptionSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Option
        fields = "__all__"
class VariantSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Variant
        fields = "__all__"
class VariantOptionSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = VariantOption
        fields = "__all__"
class ImageSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Image
        fields = "__all__"
class OrganizeSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Organize
        fields = "__all__"
class CountrySerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Country
        fields = "__all__"
class InventorySerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Inventory
        fields = "__all__"
class WishListSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = WishList
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = Order
        fields = "__all__"


    class Meta:
        model = User
        fields = (
            'id', 'username', 'first_name', 'last_name', 'email', 'is_superuser'
        )
        extra_kwargs = {
            'username': {'read_only': True},
            'email': {'read_only': True},
            'is_superuser': {'read_only': True}
        }

    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as exc:
            raise serializers.ValidationError(str(exc))
        return value

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])

        user.is_active = False
        user.save()
        return user

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)
        if 'password' in validated_data:
            user.set_password(validated_data['password'])
            user.save()
        return user