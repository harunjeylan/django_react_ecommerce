from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from account.api import MyTokenObtainPairView
# from api.api import OrderViewSet, ProductViewSet
from account import api



urlpatterns = [
    path("", api.getRoutes, name="get_routes"),
    path("api/profile/", api.getUserData, name="profile"),
    path("api/register/", api.userRegister, name="register"),

    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/profile/update_address/', api.updateAddress, name='update_address'),
    path('api/profile/update_password/', api.updatePassword, name='update_password'),

]