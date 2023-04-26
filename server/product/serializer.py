from rest_framework import serializers
from product.models import (
    Product, 
)
from service.models import (
    Review,
)

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


