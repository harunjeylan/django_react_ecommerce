from django.contrib import admin

# Register your models here.
from blog.models import  Comment,Blog, Category,Tag



@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ( 'first_name','last_name','email', 'description', 'created')


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'created',
        'updated',
        'published',
        'status',
    )
    list_filter = ( 'created', 'updated', 'published')
