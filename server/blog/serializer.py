from rest_framework import serializers
from django.contrib.auth.models import  User
import django.contrib.auth.password_validation as validators
from blog.models import Blog

class BlogSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = Blog
        fields = "__all__"
