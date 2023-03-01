from django.urls import path
from rest_framework import routers
from api import api



urlpatterns = [
  
  path("products/", api.getProducts , name="products"),
  path("products/add/", api.newProduct , name="new_products"),
  
  
  path("organize/", api.getOrganizes , name="organize"),
  path("organize/add/", api.addOrganize , name="new_organize"),
]
# router = routers.DefaultRouter()
# router.register('api/products', ProductViewSet, 'products')
# router.register('api/orders', OrderViewSet, 'orders')

# urlpatterns += router.urls