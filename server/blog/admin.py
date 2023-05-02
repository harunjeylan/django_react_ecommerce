from django.contrib import admin

# Register your models here.
from blog.models import Blog



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
