from django.http import JsonResponse
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.contrib.auth import update_session_auth_hash
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import  User
from django.db.models import Avg,Q,Count,Sum
from account.serializer import   (
    AddressSerializer, 
    PassChangeFormSerializer, 
    RegistrationSerializer, 
    UpdateAddressSerializer, 
    UpdateProfileFormSerializer, 
    UserSerializer,ProfileSerializer
)
from product.serializer import (ProductSerializer, )
from product.models import  Product
from service.models import Order,Review
from account.utils import get_tokens_for_user
from account.models import Address, Profile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        "/account/api/token",
        "api/account/token/refresh"
    ]

    return Response(routes)




# 
@api_view(['POST'])
def userRegister(request):
    username = request.data["username"]
    password = request.data["password"]
    print(request.data)
    users = User.objects.filter(username = username)
    if users.exists():
        return Response({"detail":"user is already exist with this username"}, status.HTTP_400_BAD_REQUEST)
    serializer_register_form = RegistrationSerializer(data=request.data)
    if serializer_register_form.is_valid():
        user = serializer_register_form.save()
        user.set_password(password)
        user.save()
        auth_data = get_tokens_for_user(user)
        profile, is_profile_created = Profile.objects.get_or_create(user=user)
        auth_data["user"] = {
            **ProfileSerializer(profile,context={"request":request}).data,
            **UserSerializer(user).data,
        }
        return Response(auth_data, status=status.HTTP_201_CREATED)
    return Response(serializer_register_form.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserData(request):
    address, is_address_created = Address.objects.get_or_create(user=request.user)
    profile, is_profile_created = Profile.objects.get_or_create(user=request.user)
    print(request.user)
    data = {
        "user":{
            **ProfileSerializer(profile,context={"request":request}).data,
            **AddressSerializer(address).data,
            **UserSerializer(request.user).data,
        }
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['PUT','POST'])
@permission_classes([IsAuthenticated])
def updatePersonalInfo(request):

    user_by_username = User.objects.filter(username = request.data.get("username"))
    if user_by_username.exists() and user_by_username.first() != request.user:
        return Response({"detail":"user is already exist with this username"}, status.HTTP_400_BAD_REQUEST)
    
    user_by_email = User.objects.filter(email = request.data.get("email"))
    print(user_by_email, request.user)
    if user_by_email.exists() and user_by_email.first() != request.user:
        return Response({"detail":"user is already exist with this email"}, status.HTTP_400_BAD_REQUEST)
    
    address, created = Address.objects.get_or_create(user=request.user)
    serializer_address_form = UpdateAddressSerializer(data=request.data, instance=address)
    if not serializer_address_form.is_valid():
        return Response(serializer_address_form.errors, status.HTTP_400_BAD_REQUEST)
    
    profile, is_profile_created = Profile.objects.get_or_create(user=request.user)
    serializer_profile_form = UpdateProfileFormSerializer(data=request.data, instance=profile)
    if not serializer_profile_form.is_valid():
        return Response(serializer_profile_form.errors, status.HTTP_400_BAD_REQUEST)

    address = serializer_address_form.save()
    profile = serializer_profile_form.save()
    request.user.email = request.data.get("email")
    request.user.save()
    data = {
        "user":{
            **ProfileSerializer(profile,context={"request":request}).data,
            **AddressSerializer(address).data,
            **UserSerializer(request.user).data,
        }
    }
    return Response(data, status=status.HTTP_201_CREATED)


#===========================================================================
@api_view(['PUT','POST'])
@permission_classes([IsAuthenticated])
def updatePassword(request):
    serializer_password_form = PassChangeFormSerializer(data=request.data, instance = request.user)
    if serializer_password_form.is_valid():
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        if not request.user.check_password(old_password):
            return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
        request.user.set_password(new_password)
        request.user.save()
        userSerializer = UserSerializer(request.user)
        return Response(userSerializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer_password_form.errors, status=status.HTTP_400_BAD_REQUEST)
#===========================================================================



@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getCustomerDetails(request, pk):
    user = User.objects.get(id=pk)
    address, is_address_created = Address.objects.get_or_create(user=user)
    profile, is_profile_created = Profile.objects.get_or_create(user=user)
    customer_data = {
        **ProfileSerializer(profile,context={"request":request}).data,
        **AddressSerializer(address).data,
        **UserSerializer(user).data,
    }
    orders_data = []
    for order in Order.objects.filter(customer=user):
        user = User.objects.get(id=order.customer.id)
        profile = ProfileSerializer(user.profile,context={"request":request}).data
        orders_data.append({
            "id":order.id,
            "user_id":user.id,
            "avatar":profile["image"],
            "full_name":user.get_full_name(),
            "fulfillment_status":order.fulfillment_status,
            "delivery_method":order.delivery_method,
            "total_price":order.total_price,
            "date":order.date,
        })

    wishlist,create = WishList.objects.get_or_create(customer=user)
    wishlist_data = []
    for product in wishlist.products.all():
        product_serializer = ProductSerializer(product, context={"request":request}).data,
        wishlist_data.append({
            "id":product.id,
            "title":product.title,
            "thumbnail":product_serializer[0]["thumbnail"],
            "sale_pricing":product.sale_pricing,
            "date":product.date,
            "brand":product.brand.name,
        })
 
    reviews = Review.objects.filter(Q(email=user.email)|Q(phone_number=user.profile.phone_number))
    
    reviews_data = []
    for review in reviews:
        product_serializer = ProductSerializer(product, context={"request":request}).data,
        reviews_data.append({
            "id":product.id,
            "title":product.title,
            "thumbnail":product_serializer[0]["thumbnail"],
            "description":review.description,
            "rating":review.rating,
            "created":review.created
        })
    response_data = {
        "customer":customer_data,
        "orders":orders_data,
        "wishlists":wishlist_data,
        "reviews":reviews_data,

    }
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getCustomers(request):
    customers_data = []
    new_customers = User.objects.order_by("-date_joined")
    for user in new_customers:
        profile = ProfileSerializer(user.profile,context={"request":request}).data
        orders = Order.objects.filter(customer=user).order_by("-date")
        total_spent = 0
        for order in orders:
            total_spent += order.total_price
        customers_data.append({
            "id":user.id,
            "full_name":user.get_full_name(),
            "email":user.email,
            "username":user.username,
            "avatar":profile["image"],
            "total_spent":total_spent,
            "phone_number":user.profile.phone_number,
            "last_order":orders.first().date,
            "orders":orders.count(),
            "date_joined":user.date_joined,
        })
   
    return Response(customers_data, status=status.HTTP_200_OK)
