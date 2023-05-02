from django.db.models import Func

from blog.serializer import BlogListSerializer
from service.serializer import TagSerializer


class Round(Func):
    function = 'ROUND'
    template='%(function)s(%(expressions)s, 0)'

def getAverage(value, total):
    return 0 if total == 0 else value / total * 100

def get_blog_list_data(request,blogs):
    serialized_data = []
    for blog in blogs:
        blog_data = {
            **BlogListSerializer(blog, context={"request":request}).data
        }
        if blog.tags:
            blog_data["tags"] = TagSerializer(blog.tags, many=True).data
        if blog.category:
            blog_data["category"] = blog.category.name
        serialized_data.append(blog_data)
    return serialized_data