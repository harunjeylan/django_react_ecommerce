# from django.http import JsonResponse
# from api.models import Order, Product
# from api.utils import get_tokens_for_user
# from rest_framework import viewsets, permissions
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from api.serializer import ProductSerializer, OrderSerializer, RegistrationSerializer, UserSerializer
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework import status
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.models import  User


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getProducts(request):
#     user = request.user
#     products = Product.objects.all()
#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)

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

