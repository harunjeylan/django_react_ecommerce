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

from blog.models import Blog,Comment
from blog.serializer import BlogSerializer,BlogListSerializer,BlogCommentSerializer
from api.serializer import CategorySerializer,TagSerializer
from api.models import  Category,Organize, Tag
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newBlog(request):
    
    category, created_category = Category.objects.get_or_create(name=request.data.get("category"))
    blog_felids = {
        "title":request.data.get("title"),
        "headline":request.data.get("headline"),
        "slug":request.data.get("slug"),
        "body":request.data.get("body"),
        "status":request.data.get("status"),
        "category":category.id,
    }
    blog_serializer_form = BlogSerializer(data=blog_felids)
    if blog_serializer_form.is_valid():
        blog = blog_serializer_form.save()
        tags = []
        for tag_name in request.data.get("tags"):
            tag, created_tag = Tag.objects.get_or_create(name=tag_name)
            blog.tags.add(tag)
            tags.append(TagSerializer(tag).data)

        if blog.status == "published" and blog.published == None:
            blog.publish_blog()

        serialized_data = BlogSerializer(blog).data
        return Response(serialized_data, status=status.HTTP_201_CREATED)
    else:
        return Response(blog_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)
     

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBlog(request, slug):
    blog = Blog.objects.get(slug=slug)
    category, created_category = Category.objects.get_or_create(name=request.data.get("category"))
    blog_felids = {
        "title":request.data.get("title"),
        "headline":request.data.get("headline"),
        "slug":request.data.get("slug"),
        "body":request.data.get("body"),
        "status":request.data.get("status"),
        "category":category.id,
    }
    blog_serializer_form = BlogSerializer(data=blog_felids, instance=blog)
    if blog_serializer_form.is_valid():
        blog = blog_serializer_form.save()
        tags = []
        blog.tags.clear()
        for tag_name in request.data.get("tags"):
            tag, created_tag = Tag.objects.get_or_create(name=tag_name)
            blog.tags.add(tag)
            tags.append(TagSerializer(tag).data)
        if blog.status == "published" and blog.published == None:
            blog.publish_blog()

        serialized_data = {
            **BlogSerializer(blog).data,
            "tags":tags
        }
        return Response(serialized_data, status=status.HTTP_201_CREATED)
    else:
        return Response(blog_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBlog(request):
    blog = Blog.objects.get(id=request.data.get("id"))
    blog.delete()
    return Response({"success":"blog is deleted"}, status=status.HTTP_202_ACCEPTED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def changeBlogStatus(request):
    blog = Blog.objects.get(id=request.data.get("id"))
    if request.data.get("status") in ["published","scheduled","draft","deleted"]:
        blog.status = request.data.get("status")

        if request.data.get("status") == "published":
            print(">>>>>>>>>>>>>>>>>>>")
            blog.publish_blog()
        blog.save()
    return Response({"success":"blog is saved"}, status=status.HTTP_202_ACCEPTED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    print(">>>>>>>>>>>>>>")
    blog = Blog.objects.get(id=request.data.get("blogId"))
    thumbnail = request.FILES.get("thumbnail")
    if  thumbnail:
        blog.thumbnail = thumbnail
        blog.save()
    return Response({"success":"image is uploaded"}, status=status.HTTP_201_CREATED)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeThumbnail(request):
    blog = Blog.objects.get(id=request.data.get("id"))
    blog.thumbnail = None
    blog.save()
    return Response({"success":"thumbnail is deleted"}, status=status.HTTP_202_ACCEPTED)



@api_view(['GET'])
def getAllBlogs(request):
    blogs = Blog.objects.order_by(
        "-published"
    ).filter(
        status="published"
    )
    serialized_data = BlogListSerializer(
        blogs,
        context={"request":request}, 
        many = True
    ).data
    
    return Response(serialized_data, status=status.HTTP_200_OK) 

@api_view(['GET'])
def getAllAdminBlogs(request):
    blogs = Blog.objects.order_by(
        "-created"
    )
    serialized_data = BlogListSerializer(
        blogs,
        context={"request":request}, 
        many = True
    ).data
    
    return Response(serialized_data, status=status.HTTP_200_OK) 

@api_view(['GET'])
def searchAndFilterBlog(request):
    blogs = Blog.objects.order_by("-published").filter(status="published")
    if request.GET.get("search"):
        search =  request.GET.get("search")
        blogs = blogs.order_by("-published").filter(
            Q(category__name__icontains= search) |
            Q(title__icontains = search) | 
            Q(headline__icontains = search) |
            Q(body__icontains = search),
        )

    if request.GET.get("category"):
        category =  request.GET.get("category")
        blogs = blogs.order_by("-published").filter(category__name = category.lower())

    if request.GET.get("tag"):
        tag =  request.GET.get("tag")
        blogs = blogs.order_by("-published").filter(tags__name = tag.lower())

    if request.GET.get("archive"):
        dateFilter =  request.GET.get("archive")
        year, month, *_ = dateFilter.split("-")
        blogs = blogs.order_by("-published").filter(
            published__gt = datetime(int(year), int(month), 1, tzinfo=pytz.UTC), 
            published__lte = datetime(int(year), int(month), 31, tzinfo=pytz.UTC))
        
    serialized_data = BlogListSerializer(
        blogs,
        context={"request":request}, 
        many = True
    ).data

    return Response(serialized_data, status=status.HTTP_200_OK) 

@api_view(['GET'])
def getBlogCollections(request):
    recent_blogs = BlogListSerializer(
        Blog.objects.order_by(
        "-published"
    ).filter(
        status="published"
    ).distinct()[:5],
        context={"request":request}, 
        many = True
    ).data
    
    pin_blogs = BlogListSerializer(
        Blog.objects.order_by(
        "-published"
        ).filter(
            status="published", 
            pin_to_top=True
        ).distinct(),
        context={"request":request}, 
        many = True
    ).data

    serialized_data = {
        "pin_blogs":pin_blogs,
        "recent_blogs":recent_blogs,
    }
    return Response(serialized_data, status=status.HTTP_200_OK) 

@api_view(['GET'])
def getRecentBlogs(request):
    blogs =Blog.objects.order_by("-published").filter(status="published")[:5]
    serialized_data = BlogListSerializer(
       blogs,
        context={"request":request}, 
        many = True
    ).data
    return Response(serialized_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getLastBlogs(request):
    blogs = Blog.objects.order_by("-published").filter(status="published").first()
    serialized_data = BlogListSerializer(
       blogs,
        context={"request":request}, 
        many = True
    ).data
    return Response(serialized_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getPinToTopBlogs(request):
    blogs = Blog.objects.order_by("-published").filter(status="published", pin_to_top=True)
    serialized_data = BlogListSerializer(
       blogs,
        context={"request":request}, 
        many = True
    ).data
    return Response(serialized_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getBlogDetails(request, slug):
    blog = Blog.objects.get(status="published", slug=slug)
    comments = BlogCommentSerializer(Comment.objects.filter(blog=blog), many=True).data
    blog_data = BlogSerializer(
        blog,
        context={"request":request}, 
    ).data
    serialized_data = {
        **blog_data, 
        "comments":comments
    }
    return Response(serialized_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getAdminBlogDetails(request, slug):
    blog = Blog.objects.get(slug=slug)
    comments = BlogCommentSerializer(Comment.objects.filter(blog=blog), many=True).data
    tags = TagSerializer(blog.tags.all(), many=True).data
    category = CategorySerializer(blog.category).data
    blog_data = BlogSerializer(
        blog,
        context={"request":request}, 
    ).data
    serialized_data = {
        **blog_data, 
        "comments":comments,
        "tags":tags,
        "category":category
    }
    return Response(serialized_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getRelatedBlogs(request, slug):
    blog = Blog.objects.get(status="published", slug=slug)
    serialized_data = BlogSerializer(
        Blog.objects.order_by("-published").filter(
            status="published",
            category__name__icontains= blog.category
        ).exclude(id=blog.id),
        context={"request":request},
        many=True
    ).data
    return Response(serialized_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getBlogFilter(request):
    archives = Blog.objects.dates('published', 'month')
    categories = CategorySerializer(Category.objects.filter(blog__status="published").distinct(), many=True).data
    tags = TagSerializer(Tag.objects.filter(blog__status="published").distinct(), many=True).data
    serialized_data = {
        "archives":archives,
        "categories":categories,
        "tags":tags,
    }
    return Response(serialized_data, status=status.HTTP_200_OK) 

@api_view(['GET'])
def getArchives(request):
    return Response(Blog.objects.dates('published', 'month'), status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllCategory(request):
    categories = CategorySerializer(Category.objects.filter(blog__status="published"), many=True).data
    return Response(categories, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllTags(request):
    tags = TagSerializer(Tag.objects.filter(blog__status="published"), many=True).data
    return Response(tags, status=status.HTTP_200_OK)

@api_view(['POST'])
def addBlogComment(request, slug):
    blog = Blog.objects.get(slug=slug)
    comment_serializer_form = BlogCommentSerializer(data={**request.data,"blog":blog.id})
    if comment_serializer_form.is_valid():
        comment = comment_serializer_form.save()
        return Response(BlogCommentSerializer(comment).data, status=status.HTTP_201_CREATED)
    return Response(comment_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)