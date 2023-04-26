from django.contrib import admin

from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'brand',
        'description',
        'thumbnail',
        'organize',
        'regular_pricing',
        'sale_pricing',
        'stock',
        'shipping_type',
        'global_delivery',
        'fragile_product',
        'biodegradable',
        'frozen_product',
        'expiry_date',
    )


