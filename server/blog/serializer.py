from rest_framework import serializers
from blog.models import Blog

class BlogSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = Blog
        fields = "__all__"
class BlogListSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    class Meta:
        model = Blog
        fields = (
        "title",
        "headline",
        "slug",
        "thumbnail",
        "category",
        "tags",
        "published",
    )