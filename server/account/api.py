from django.http import JsonResponse
from api.models import Order, Product
from api.utils import get_tokens_for_user
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.contrib.auth import update_session_auth_hash
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from account.serializer import   AddressSerializer, PassChangeFormSerializer, RegistrationSerializer, UpdateAddressSerializer, UpdateProfileFormSerializer, UserSerializer,ProfileSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import  User
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





@api_view(['POST'])
def userRegister(request):
    username = request.data["username"]
    # print(request.data)
    users = User.objects.filter(username = username)

    if users.exists():
        return Response({"detail":"user is already exist with this username"}, status.HTTP_208_ALREADY_REPORTED)
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username = username)
        auth_data = get_tokens_for_user(user)
        userSerializer = UserSerializer(user)
        auth_data["user"] = userSerializer.data
        return Response(auth_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserData(request):
    userSerializer = UserSerializer(request.user)


    address, is_address_created = Address.objects.get_or_create(user=request.user, address_type="default")
    profile, is_profile_created = Profile.objects.get_or_create(user=request.user)
    profileSerializer = ProfileSerializer(profile)
    addressSerializer = AddressSerializer(address)
    absolute_image_url = request.build_absolute_uri(request.user.profile.get_image()) if request.user.profile.get_image() != None else None
    data = {
        "user":{
            **userSerializer.data,
            **profileSerializer.data,
            **addressSerializer.data,
            "image":absolute_image_url
        }
    }
    return Response(data)


@api_view(['PUT','POST'])
@permission_classes([IsAuthenticated])
def updateAddress(request):
    address, created = Address.objects.get_or_create(user=request.user, address_type="default")
    serializer_address_form = UpdateAddressSerializer(data=request.data, instance=address)
    serializer_profile_form = UpdateProfileFormSerializer(data=request.data, instance=request.user.profile)
    error_data={}
    saved_data={}
    if serializer_address_form.is_valid():
        address = serializer_address_form.save()
        addressSerializer = AddressSerializer(address)
        saved_data = {**saved_data, **addressSerializer.data}
    else:
        error_data["address_error"] = serializer_address_form.errors

    if serializer_profile_form.is_valid():
        profile = serializer_profile_form.save()
        request.user.email = request.data.get("email")
        print(request.data.get("email"),">>>>>>>>>>>>>>>>>>")
        request.user.save()
        profileSerializer = ProfileSerializer(profile)
        saved_data = {**saved_data,**profileSerializer.data}
    else:
        error_data["profile_error"] = serializer_profile_form.errors

    if not len(error_data):
        return Response(saved_data, status=status.HTTP_201_CREATED)
    
    return Response({**error_data,**saved_data}, status=status.HTTP_400_BAD_REQUEST)


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