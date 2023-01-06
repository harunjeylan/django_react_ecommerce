from django.http import JsonResponse
from api.models import Order, Product
from api.utils import get_tokens_for_user
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.serializer import ProductSerializer, OrderSerializer, RegistrationSerializer, UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import  User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        userSerializer = UserSerializer(user)
        token['user'] = userSerializer.data
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        "/api/token",
        "api/token/refresh"
    ]

    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProducts(request):
    user = request.user
    print(user)
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def userRegister(request):
    print(request.data)
    username = request.data["username"]
    print(request.data)
    # users = User.objects.filter(username = username)

    # if users.exists():
    #     return Response({"isCreated":False,"message":"user is already exist"}, status.HTTP_208_ALREADY_REPORTED)
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username = username)
        auth_data = get_tokens_for_user(user)
        userSerializer = UserSerializer(user)
        auth_data["user"] = userSerializer.data
        return Response(auth_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getUserData(request):
    userSerializer = UserSerializer(request.user)
    return Response({"user":userSerializer.data})

# {
#   "first_name":"harun-1",
#   "last_name":"jey",
#   "username":"harun_1",
#   "password1":"123qwe,./",
#   "password2":"123qwe,./"
# }
    # 
#   {
#   "first_name":"harun-1",
#   "last_name":"jey",
#   "username":"harun_2",
#   "password":"123qwe,./"
# }  

# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = ProductSerializer

# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = OrderSerializer

