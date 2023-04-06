from django.urls import path
from blog import api



urlpatterns = [
    path("", api.getAllBlogs, name="blogs"),
    path("add/", api.newBlog , name="new_blog"),
    path("<pk>/edit/", api.updateBlog , name="edit"),
    path("delete/", api.deleteBlog , name="delete"),
    path("images/upload/", api.uploadImage , name="upload_image"),
    path("thumbnail/remove/", api.removeThumbnail , name="remove_image"),
    path("search-and-filter/", api.searchAndFilterBlog , name="search_and_filter_blogs"),
    path("<slug>", api.getBlogDetails, name="blog-details"),
    path("<slug>/admin", api.getAdminBlogDetails, name="blog-details-admin"),
    
    path("<slug>/related/", api.getRelatedBlogs, name="blog-related"),
    path("<slug>/comment/add/", api.addBlogComment, name="add-blog-comment"),


    path("collections/", api.getBlogCollections , name="collections"),
    path("pin/", api.getPinToTopBlogs , name="pin-to-top"),
    path("last/", api.getLastBlogs, name="last"),
    path("recent/", api.getRecentBlogs, name="recent"),

    path("filter/", api.getBlogFilter , name="filter"),
    path("archives/", api.getArchives , name="archives"),
    path("categories/", api.getAllCategory , name="categories"),
    path("tags/", api.getAllTags , name="tags"),
]


