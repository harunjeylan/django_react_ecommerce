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
    path("profile/", api.getUserData, name="profile"),
    path("register/", api.userRegister, name="register"),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('profile/update/', api.updatePersonalInfo, name='update_profile'),
    path("profile/image/upload/", api.uploadProfileImage, name="get_routes"),
    path('profile/password/change/', api.updatePassword, name='update_password'),


    path("admin/customers/", api.getCustomers, name="admin_customers"),
    path("admin/customers/note/add/", api.addCustomerNote,
         name="admin_add_customer_note"),
    path("admin/customers/<pk>/", api.getCustomerDetails,
         name="admin_customer_details"),

]
