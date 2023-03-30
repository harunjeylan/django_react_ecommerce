from django.urls import path
from blog import api



urlpatterns = [
    path("", api.getAllBlogs, name="blogs"),
    path("search-and-filter/", api.searchAndFilterBlog , name="search_and_filter_blogs"),

    path("<slug>", api.getBlogDetails, name="blog-details"),
    path("<slug>/related/", api.getRelatedBlogs, name="blog-related"),


    path("collections/", api.getBlogCollections , name="collections"),
    path("pin/", api.getPinToTopBlogs , name="pin-to-top"),
    path("last/", api.getLastBlogs, name="last"),
    path("recent/", api.getRecentBlogs, name="recent"),

    path("filter/", api.getBlogFilter , name="filter"),
    path("archives/", api.getArchives , name="archives"),
    path("categories/", api.getAllCategory , name="categories"),
    path("tags/", api.getAllTags , name="tags"),
]


