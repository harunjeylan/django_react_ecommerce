from rest_framework import serializers
from product.models import (
    Product,
)


class ProductListSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(
        max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Product
        fields = ['title', 'description', 'thumbnail',
                  'regular_pricing', 'sale_pricing']


class ProductSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(
        max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Product
        fields = "__all__"
