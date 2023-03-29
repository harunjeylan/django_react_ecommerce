from django.contrib import admin

# Register your models here.
from blog.models import  Comment,Blog, Category,Tag



@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ( 'first_name','last_name','email', 'body', 'created')


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = (
        'author',
        'title',
        'created',
        'updated',
        'published',
        'status',
    )
    list_filter = ('author', 'created', 'updated', 'published')
