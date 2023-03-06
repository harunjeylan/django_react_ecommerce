from django.urls import path
from rest_framework import routers
from api import api



urlpatterns = [
  
  path("products/add/", api.newProduct , name="new_products"),
  path("products/", api.getProducts , name="products"),
  path("products/recommended/", api.getRecommendedProducts , name="recommended_products"),
  path("products/search-and-filter/", api.searchAndFilterProducts , name="search_and_filter_products"),
  path("products/<pk>/", api.getProductsDetailes , name="products_detailes"),
  path("products/category/<pk>/", api.getProductsByCategory , name="products_by_category"),

  
  path("categories/", api.getAllCategory , name="categories"),

  path("brands/", api.getAllBrands , name="brands"),
  path("brands/add/", api.addBrand , name="new_brand"),
  path("brands/update/", api.updateBrand , name="update_brand"),
  path("brands/delete/", api.deleteBrand , name="delete_brand"),

  path("variants/", api.getAllVariants , name="variants"),
  path("variants/add/", api.addVariant , name="new_variant"),
  path("variants/update/", api.updateVariant , name="update_variant"),
  path("variants/delete/", api.deleteVariant , name="delete_variant"),
  path("variants/options/delete/", api.deleteOption , name="delete_option"),

  path("organize/", api.getOrganizes , name="organize"),
  path("organize/add/", api.addOrganize , name="new_organize"),
  path("organize/update/", api.updateOrganize , name="update_organize"),
  
]
# router = routers.DefaultRouter()
# router.register('api/products', ProductViewSet, 'products')
# router.register('api/orders', OrderViewSet, 'orders')

# urlpatterns += router.urls