from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Func
import datetime
from django.db.models import Avg, Q, Count, Sum

from service.utils import get_rating
from service.models import Discount, Organize
from service.serializer import (
    BrandSerializer,
    CategorySerializer,
    CollectionSerializer,
    ImageSerializer,
    DiscountSerializer,
    ReviewSerializer,
    TagSerializer,
    VendorSerializer,
)
from product.serializer import (
    ProductSerializer,
)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class Round(Func):
    function = 'ROUND'
    template = '%(function)s(%(expressions)s, 0)'


def getAverage(value, total):
    return 0 if total == 0 else value / total * 100

def get_product_list_data(request, products, discount_amount=0):
    product_data =[]
    for product in products:
        product_serializer = ProductSerializer(product, context={"request": request}).data

        discount = None
        today = datetime.date.today()
        sale_pricing = product.sale_pricing
        if product.discount:
            discount = DiscountSerializer( product.discount).data
            if  product.discount.end_date >= today:
                sale_pricing = round(product.sale_pricing - (product.discount.amount / product.sale_pricing),2)
        elif discount_amount != 0:
            sale_pricing  = round(product.sale_pricing - (discount_amount / product.sale_pricing), 2)

        rating=0
        if product.reviews.exists():
            rating = round(product.reviews.all().aggregate(Avg('rating'))["rating__avg"], 2)
        product_data.append({
            "id": product.id,
            "title": product.title,
            "description": product.description,
            "thumbnail": product_serializer["thumbnail"],
            "images": ImageSerializer(product.images.all()[:2], many=True,context={"request": request}).data,
            "sale_pricing": sale_pricing,
            "regular_pricing":product.regular_pricing,
            "date": product.date,
            "brand": product.brand.name,
            "category": product.organize.category.name,
            "collection": product.organize.collection.name,
            "vendor": product.organize.vendor.name,
            "discount": discount,
            "rating":rating,
        })
    return product_data


def get_product_data(request, product, discount_amount=0):
    variants = []
    for variant_option in product.variants.all():
        variants.append({
            "options": variant_option.options.all().values("label","id"),
            "variantLabel": variant_option.variant.label,
        })

    organize = Organize.objects.filter(product=product)
    organize_data = {}
    if organize.exists():
        organize_data = {
            "category": CategorySerializer(organize.first().category).data,
            "collection": CollectionSerializer(organize.first().collection).data,
            "vendor": VendorSerializer(organize.first().vendor).data,
            "tags": TagSerializer(organize.first().tags, many=True).data,
        }

    discount = None
    today = datetime.date.today()
    sale_pricing = product.sale_pricing
    if product.discount:
        discount = DiscountSerializer( product.discount).data
        if  product.discount.end_date >= today:
            sale_pricing = round(product.sale_pricing - (product.discount.amount / product.sale_pricing),2)
    elif discount_amount != 0:
        sale_pricing  = round(product.sale_pricing - (discount_amount / product.sale_pricing), 2)


    serialized_data = {
        **ProductSerializer(product, context={"request": request}).data,
        "images": ImageSerializer(product.images.all(), many=True, context={"request": request}).data,
        "reviews":ReviewSerializer(product.reviews.all(), many=True).data,
        "brand": BrandSerializer(product.brand).data,
        "rating": get_rating(product.reviews),
        "regular_pricing":product.regular_pricing,
        "sale_pricing":sale_pricing,
        "organize":organize_data,
        "variants": variants,
        "discount":discount,
    }
    return serialized_data


