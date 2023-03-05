from django.urls import path
from rest_framework import routers
from api import api



urlpatterns = [
  
  path("products/add/", api.newProduct , name="new_products"),
  path("products/", api.getProducts , name="products"),
  path("products/recommended/", api.getRecommendedProducts , name="recommended_products"),
  path("products/category/<pk>/", api.getProductsByCategory , name="products_by_category"),
  path("products/search-and-filter/", api.searchAndFilterProducts , name="search_and_filter_products"),
  path("products/<pk>/", api.getProductsDetailes , name="products_detailes"),

  
  path("products/categories/", api.getAllCategory , name="categories"),

  path("products/brands/", api.getAllBrands , name="brands"),
  path("products/brands/add/", api.addBrand , name="new_brand"),

  path("products/variants/", api.getAllVariants , name="variants"),
  path("products/variants/add/", api.addVariant , name="new_variant"),

  path("products/organize/", api.getOrganizes , name="organize"),
  path("products/organize/add/", api.addOrganize , name="new_organize"),
]
# router = routers.DefaultRouter()
# router.register('api/products', ProductViewSet, 'products')
# router.register('api/orders', OrderViewSet, 'orders')

# urlpatterns += router.urls