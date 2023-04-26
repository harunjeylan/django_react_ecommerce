from django.urls import path
from rest_framework import routers


from product import api



urlpatterns = [
  
  path("", api.getProducts , name="products"),
  path("add/", api.newProduct , name="new_products"),
  path("delete/", api.deleteProduct , name="delete_products"),
  path("multi-delete/", api.deleteMultiProducts , name="multi-delete_products"),
  
  path("ratings/", api.getRatings , name="products_ratings"),
  path("images/upload/", api.uploadImage , name="upload_image"),
  
  path("discount/multi-change/", api.changeMultiProductsDiscount , name="discount-multi-change"),
  path("thumbnail/remove/", api.removeThumbnail , name="remove_image"),

  path("search-and-filter/", api.searchAndFilterProducts , name="search_and_filter_products"),
  path("search/", api.searchProducts , name="search_and_filter_products"),

  path("most-sealed/", api.getMostSealedProducts , name="most-sealed-products"),
  path("top-rated/", api.getTopRatedProducts , name="top-rated-products"),

  path("category/<category_name>/", api.getProductsByCategory , name="products_by_category"),
  path("admin/", api.getProductsForAdmin , name="admin_products"),
  
  path("<pk>/", api.getProductsDetails , name="products_details"),
  path("<pk>/edit/", api.updateProduct , name="products_edit"),
  path("<pk>/related/", api.getRelatedProducts , name="related_products"),
  path("<pk>/review/add/", api.addProductReview , name="new_products_review"),
  path("<pk>/admin/", api.getProductsDataForAdmin , name="admin_products_data"),
  # ===================================================================
  
]
# router = routers.DefaultRouter()
# router.register('api/products', ProductViewSet, 'products')
# router.register('api/orders', OrderViewSet, 'orders')

# urlpatterns += router.urls