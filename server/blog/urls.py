from django.urls import path
from blog import api



urlpatterns = [
    path("", api.getAllBlogs, name="blogs"),
    path("search-and-filter/", api.searchAndFilterBlog , name="search_and_filter_blogs"),
    path("pin-to-top/", api.getPinToTopBlogs , name="pin-to-top"),
    path("last/", api.getLastBlogs, name="last"),
    path("recent/", api.getRecentBlogs, name="recent"),

    path("archives/", api.getArchives , name="archives"),
    path("categories/", api.getAllCategory , name="categories"),
    path("tags/", api.getAllTags , name="tags"),
]