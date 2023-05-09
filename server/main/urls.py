from django.urls import path
from rest_framework import routers


from main import views

urlpatterns = [
  path("", views.getRoutes , name="home-page"),
]