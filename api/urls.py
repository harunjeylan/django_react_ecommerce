from rest_framework import routers

from api.api import OrderViewSet, ProductViewSet

router = routers.DefaultRouter()
router.register('api/products', ProductViewSet, 'products')
router.register('api/orders', OrderViewSet, 'orders')

urlpatterns = router.urls