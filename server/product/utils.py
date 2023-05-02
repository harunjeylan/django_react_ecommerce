from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Func
import datetime
from django.db.models import Avg, Q, Count, Sum

from service.models import Discount
from service.serializer import (
    ImageSerializer,
    DiscountSerializer,
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


def get_product_data(request, product):
    data = {
        **ProductSerializer(product, context={"request": request}).data,
        "images": ImageSerializer(product.images.all(), many=True, context={"request": request}).data,
        "rating": product.reviews.all().aggregate(Avg('rating'))["rating__avg"],
    }

    today = datetime.date.today()
    if  product.discount:
        if product.discount.end_date >= today:
            data["discount"] = DiscountSerializer(product.discount).data
            if not request.user.is_superuser:
                data["regular_pricing"] = round(product.sale_pricing, 2)
                data["sale_pricing"] = round(product.sale_pricing - \
                    (data["discount"]["amount"] / product.sale_pricing), 2)

    else:
        data["discount"] = None
    return data
