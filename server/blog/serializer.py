from rest_framework import serializers
from blog.models import Blog,Comment

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
        
class BlogCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"