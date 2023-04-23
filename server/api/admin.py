from django.contrib import admin

from .models import (
    Category,
    OrderdProduct,
    OrderdVariantOption, 
    RecommendedProduct,
    Review, 
    Vendor, 
    Collection, 
    Tag, 
    Option, 
    Discount,
    Variant, 
    VariantOption, 
    Image, 
    Organize, 
    Product, 
    Country, 
    Inventory, 
    Order, 
    WishList,
    Brand,
    OrderAddress,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ( 'name',)
    search_fields = ('name',)


@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ( 'name',)
    search_fields = ('name',)


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ( 'name',)
    search_fields = ('name',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ( 'name',)


@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ( 'label',)

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ( 'name',)

@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = ( 'name','start_date','end_date','amount')

@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
    list_display = ( 'label',)
   


@admin.register(VariantOption)
class VariantOptionAdmin(admin.ModelAdmin):
    list_display = ('variant',)
    list_filter = ('options', 'variant')


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('image',)


@admin.register(Organize)
class OrganizeAdmin(admin.ModelAdmin):
    list_display = ('category', 'collection', 'vendor')
    list_filter = ('category', 'collection', 'vendor')
    raw_id_fields = ('tags',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'brand',
        'description',
        'thumbnail',
        'organize',
    )
    list_filter = ('organize',)



@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
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


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        'product',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'description',
        'rating',
        'created',
    )
    list_filter = ('product','rating')

@admin.register(RecommendedProduct)
class RecommendedProductAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'subtitle',
    )
    list_filter = ('title',)

@admin.register(OrderAddress)
class OrderAddressAdmin(admin.ModelAdmin):
    list_display = (
        'first_name',
        'last_name',
        'email',
        'country',
        'street1',
        'street2',
        'city',
        'zipcode',
        'state',
    )

@admin.register(OrderdProduct)
class OrderdProductAdmin(admin.ModelAdmin):
    list_display = (
        'product',
        'count',
    )
    list_filter = ('product','count', 'variants')



@admin.register(OrderdVariantOption)
class OrderdVariantOptionAdmin(admin.ModelAdmin):
    list_display = ('variant','option')
    list_filter = ('option', 'variant')



@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'date',
        'customer',
        'fulfillment_status',
        'delivery_type',
    )
    list_filter = ('date', 'customer')


@admin.register(WishList)
class WishListAdmin(admin.ModelAdmin):
    list_display = ('customer',)
    list_filter = ('customer',)
