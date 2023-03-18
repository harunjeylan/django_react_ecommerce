from django.urls import path
from main import api



urlpatterns = [
    path("", api.getDashboardData, name="get_dashboard_data"),
]