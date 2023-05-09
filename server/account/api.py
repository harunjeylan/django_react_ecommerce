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
from django.contrib.auth.models import User
from django.db.models import Avg, Q, Count, Sum
from account.serializer import (
    AddressSerializer,
    PassChangeFormSerializer,
    RegistrationSerializer,
    UpdateAddressSerializer,
    UpdateProfileFormSerializer,
    UserSerializer, ProfileSerializer,
    CustomerNoteSerializer,
    UpdateUserFormSerializer,
)
from product.serializer import (ProductListSerializer, ProductSerializer, )
from product.models import Product
from product.utils import get_product_data, get_product_list_data
from account.decorators import admin_only
from service.utils import get_order_list_data, get_order_total_price
from service.serializer import DiscountSerializer
from service.models import Discount, Order, Review
from account.utils import get_tokens_for_user, get_user_data
from account.models import Address, Profile, CustomerNote


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(token)
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
    users = User.objects.filter(username=username)
    if users.exists():
        return Response({"detail": "user is already exist with this username"}, status.HTTP_400_BAD_REQUEST)
    serializer_register_form = RegistrationSerializer(data=request.data)
    if serializer_register_form.is_valid():
        user = serializer_register_form.save()
        user.set_password(password)
        user.save()
        auth_data = get_tokens_for_user(user)
        profile, is_profile_created = Profile.objects.get_or_create(user=user)
        auth_data["user"] = {
            **ProfileSerializer(profile, context={"request": request}).data,
            **UserSerializer(user).data,
        }
        return Response(auth_data, status=status.HTTP_201_CREATED)
    return Response(serializer_register_form.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserData(request):
    data = {"user": get_user_data(request, request.user)}
    return Response(data, status=status.HTTP_200_OK)


@api_view(['PUT', 'POST'])
@permission_classes([IsAuthenticated])
def updatePersonalInfo(request):
    serializer_user_form = UpdateUserFormSerializer( data=request.data, instance=request.user)
    if not serializer_user_form.is_valid():
        return Response(serializer_user_form.errors, status.HTTP_400_BAD_REQUEST)

    address, created = Address.objects.get_or_create(user=request.user)
    serializer_address_form = UpdateAddressSerializer(data=request.data, instance=address)
    if not serializer_address_form.is_valid():
        return Response(serializer_address_form.errors, status.HTTP_400_BAD_REQUEST)

    profile, is_profile_created = Profile.objects.get_or_create(user=request.user)
    serializer_profile_form = UpdateProfileFormSerializer(data=request.data, instance=profile)
    if not serializer_profile_form.is_valid():
        return Response(serializer_profile_form.errors, status.HTTP_400_BAD_REQUEST)

    user =  serializer_user_form.save()
    address = serializer_address_form.save()
    profile = serializer_profile_form.save()
    request.user.save()
    data = get_user_data(request, user)
    return Response(data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadProfileImage(request):
    profile, is_profile_created = Profile.objects.get_or_create(
        user=request.user)
    image = request.FILES.get("image")
    if  image:
        profile.image = image
        profile.save()
    return Response({"success":"image is uploaded"}, status=status.HTTP_201_CREATED)


# ===========================================================================
@api_view(['PUT', 'POST'])
@permission_classes([IsAuthenticated])
def updatePassword(request):
    serializer_password_form = PassChangeFormSerializer(
        data=request.data, instance=request.user)
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
# ===========================================================================


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@admin_only
def getCustomerDetails(request, pk):
    user = User.objects.get(id=pk)
    customer_data =  get_user_data(request, user)
    orders_data =  get_order_list_data(request, Order.objects.filter(customer=user))
    wishlist_data = get_product_list_data(request, Product.objects.filter(wishes=user))
    user_note_serializer = CustomerNoteSerializer(CustomerNote.objects.filter(customer=user), many=True).data
    response_data = {
        "customer": customer_data,
        "orders": orders_data,
        "wishlists": wishlist_data,
        "notes": user_note_serializer,
    }
    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@admin_only
def getCustomers(request):
    customers_data = []
    new_customers = User.objects.order_by("-date_joined")
    for user in new_customers:
        data = get_user_data(request, user)
        orders = Order.objects.filter(customer=user).order_by("-date")
        if orders.exists():
            data["last_order"] = orders.first().date
            data["orders"] = orders.count()
            total_spent = 0
            for order in orders:
                total_spent += get_order_total_price(order)
            data["total_spent"] = round(total_spent,2)
        customers_data.append(data)
    return Response(customers_data, status=status.HTTP_200_OK)


@api_view(['POST'])
@admin_only
def addCustomerNote(request):
    user_note_serializer = CustomerNoteSerializer(data=request.data)
    if user_note_serializer.is_valid():
        user_note = user_note_serializer.save()
        serialized_data = CustomerNoteSerializer(user_note).data
        return Response(serialized_data, status=status.HTTP_202_ACCEPTED)
    return Response(user_note_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
