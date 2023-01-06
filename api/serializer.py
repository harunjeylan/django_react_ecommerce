from rest_framework import serializers
from api.models import Order, Product, Image
from django.contrib.auth.models import  User
import django.contrib.auth.password_validation as validators



class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    class Meta:
        model = Product
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