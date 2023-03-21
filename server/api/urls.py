from django.urls import path
from rest_framework import routers
from api import api



urlpatterns = [
  
  path("products/", api.getProducts , name="products"),
  path("products/add/", api.newProduct , name="new_products"),
  path("products/delete/", api.deleteProduct , name="delete_products"),

  path("products/recommended/", api.getRecommendedProducts , name="recommended_products"),
  path("products/ratings/", api.getRatings , name="products_ratings"),
  path("products/images/upload/", api.uploadImage , name="upload_image"),
  
  path("products/thumbnail/remove/", api.removeThumbnail , name="remove_image"),
  path("products/images/remove/", api.removeImage , name="remove_image"),

  

  path("products/search-and-filter/", api.searchAndFilterProducts , name="search_and_filter_products"),
  path("products/category/<category_name>/", api.getProductsByCategory , name="products_by_category"),
  path("products/<pk>/", api.getProductsDetails , name="products_details"),
  path("products/<pk>/edit/", api.updateProduct , name="products_edit"),
  path("products/<pk>/related/", api.getRelatedProducts , name="related_products"),
  path("products/<pk>/review/add/", api.addProductReview , name="new_products_review"),

  
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
  path("organize/delete/", api.deleteOrganize , name="delete_organize"),
  path("organize/categories/", api.getAllCategory , name="delete_organize"),

  # ===================================================================
  path("wishlists/", api.getWishlist , name="wishlists"),
  path("wishlists/toggle/", api.toggleWishlist , name="toggle_wishlists"),


  path("orders/", api.getOrders , name="order"),
  path("orders/add/", api.addOrder , name="new_order"),
  path("orders/update/", api.updateOrder , name="update_order"),
  path("orders/<pk>/", api.getOrderDetails , name="order_details"),

  path("admin/orders/", api.getOrdersForAdmin , name="order_for_admin"),
  path("admin/orders/<pk>/", api.getOrderDetailsForAdmin , name="order_details_for_admin"),
  # path("admin/orders/delete/", api.deleteOrderForAdmin , name="delete_orders_for_admin"),

  path("admin/products/", api.getProductsForAdmin , name="admin_products"),
  path("admin/products/<pk>/", api.getProductsDataForAdmin , name="admin_products_data"),
  path("admin/customers/", api.getCustomers , name="admin_customers"),
  path("admin/customers/<pk>/", api.getCustomerDetails , name="admin_customer_details"),
]
# router = routers.DefaultRouter()
# router.register('api/products', ProductViewSet, 'products')
# router.register('api/orders', OrderViewSet, 'orders')

# urlpatterns += router.urls