from django.contrib import admin

from .models import (
    Category,
    OrderedItem,
    OrderedVariantOption,
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
    Country,
    Order,
    Brand,
    OrderAddress,
    Comment,
    Contact,
    Subscriber,
    Fqa,
)

# Register your models here.

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


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
    search_fields = ('name',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ( 'first_name','last_name','email', 'description', 'created')


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ( 'first_name','last_name','email', 'description', 'created')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'description',
        'rating',
        'created',
    )
    list_filter = ('product','rating')



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

@admin.register(OrderedItem)
class OrderdItemAdmin(admin.ModelAdmin):
    list_display = (
        'count',
    )
    list_filter = ('count', 'variants')



@admin.register(OrderedVariantOption)
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


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ( 'email',"date")


@admin.register(Fqa)
class FqaAdmin(admin.ModelAdmin):
    list_display = ( 'question','answer',"date")