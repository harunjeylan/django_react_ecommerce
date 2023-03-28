from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime #, timedelta, date
from django.db.models import Q, Count #, F, Subquery, Sum
import pytz

# from django.contrib.auth.models import  User
# from rest_framework import status
# from django.utils import timezone
# import random
# from django.db.models.functions import (
#    ExtractYear, ExtractMonth, ExtractDay, ExtractWeekDay,
#    ExtractHour, ExtractMinute, ExtractSecond,
#    TruncDay,
# )
# from api.models import Order, OrderdProduct
# from account.serializer import ProfileSerializer, UserSerializer
# from api.utils import getAverage
# import itertools

from blog.models import Blog
from blog.serializer import BlogSerializer
from api.serializer import CategorySerializer,TagSerializer
from api.models import (
    Category,
    Tag,
    )

@api_view(['GET'])
def getAllBlogs(request):
    blogs = Blog.objects.order_by("-published").filter(status="published")
    
  
    return Response(BlogSerializer(blogs,context={"request":request}, many=True).data, status=status.HTTP_200_OK) 

@api_view(['GET'])
def searchAndFilterBlog(request):
    blogs = Blog.objects.order_by("-published").filter(status="published")
    if request.GET.get("search"):
        search =  request.GET.get("search")
        print(search)
        blogs = blogs.order_by("-published").filter(
            Q(category__name__icontains= search) |
            Q(title__icontains = search),
            Q(headline__icontains = search),
            Q(body__icontains = search),
            status="published"
        )
        
        
    if request.GET.get("category") and request.GET.get("category") != "all":
        category =  request.GET.get("category")
        blogs = blogs.order_by("-published").filter(category__title = category, status="published")
    
    if request.GET.get("date"):
        dateFilter =  request.GET.get("date")
        year, month, *_ = dateFilter.split("-")
        blogs = blogs.order_by("-published").filter(
            published__gt = datetime(int(year), int(month), 1, tzinfo=pytz.UTC), 
            published__lte = datetime(int(year), int(month), 31, tzinfo=pytz.UTC), 
            status="published")
        print("int is working")
 
    return Response(BlogSerializer(blogs,context={"request":request}, many=True).data, status=status.HTTP_200_OK) 

@api_view(['GET'])
def getRecentBlogs(request):
    blogs = BlogSerializer(
        Blog.objects.order_by("-published").filter(status="published")[:5],
        context={"request":request}, 
        many=True
    ).data
    return Response(blogs, status=status.HTTP_200_OK)

@api_view(['GET'])
def getLastBlogs(request):
    blogs = BlogSerializer(
        Blog.objects.order_by("-published").filter(status="published").first(),
        context={"request":request}
    ).data
    return Response(blogs, status=status.HTTP_200_OK)

@api_view(['GET'])
def getPinToTopBlogs(request):
    blogs = BlogSerializer(
        Blog.objects.order_by("-published").filter(status="published", pin_to_top=True),
        context={"request":request}, 
        many=True
    ).data
    return Response(blogs, status=status.HTTP_200_OK)

@api_view(['GET'])
def getArchives(request):
    return Response(Blog.objects.dates('published', 'month'), status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllCategory(request):
    categories = CategorySerializer(Category.objects.filter(blog__status="published"), many=True).data
    return Response(categories, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllTags(request):
    categories = TagSerializer(Tag.objects.filter(blog__status="published"), many=True).data
    return Response(categories, status=status.HTTP_200_OK)
