from django.urls import path
from rest_framework import routers
from api import api



urlpatterns = [
  path("products/add/", api.newProduct , name="new_products")
]
# router = routers.DefaultRouter()
# router.register('api/products', ProductViewSet, 'products')
# router.register('api/orders', OrderViewSet, 'orders')

# urlpatterns += router.urls