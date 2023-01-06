from django.contrib import admin

from .models import Category, Tag, Option, Variants, Image, Product, Countries, Inventory, Order


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ( 'name',)
    search_fields = ('name',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ( 'label',)


@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ( 'label',)


@admin.register(Variants)
class VariantsAdmin(admin.ModelAdmin):
    list_display = ( 'label',)
    raw_id_fields = ('options',)


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ( 'image',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        
        'title',
        'brand',
        'description',
        'category',
        'price',
        'thumbnail',
    )
    list_filter = ('category',)
    raw_id_fields = ('images', 'organize', 'variants')


@admin.register(Countries)
class CountriesAdmin(admin.ModelAdmin):
    list_display = ( 'name', 'code')
    search_fields = ('name',)


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = (
        
        'regular_pricing',
        'sale_pricing',
        'stock',
        'shipping_type',
        'global_delivery',
        'fragile_product',
        'biodegradable',
        'frozen_product',
        'expiry_date',
        'product',
    )
    list_filter = (
        'fragile_product',
        'biodegradable',
        'frozen_product',
        'expiry_date',
        'product',
    )
    raw_id_fields = ('countries',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        
        'date',
        'customer',
        'email',
        'fulfillment_status',
        'delivery_type',
        'countries',
    )
    list_filter = ('date', 'customer', 'countries')
    raw_id_fields = ('products',)