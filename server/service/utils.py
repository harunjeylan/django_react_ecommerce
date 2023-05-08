from django.db.models import Func
from django.db.models import Avg, Q, Count, Sum
from django.contrib.auth.models import User
from account.serializer import (
    AddressSerializer,
    ProfileImageSerializer,
    ProfileSerializer,

)
from service.serializer import DeliverySerializer
class Round(Func):
    function = 'ROUND'
    template = '%(function)s(%(expressions)s, 0)'


def getAverage(value, total):
    return 0 if total == 0 else value / total * 100


def get_order_total_price(order):
    total_price = 0
    for item in order.items.all():
        total_price += item.count *  item.sale_pricing
    return round(total_price, 2)

def get_order_list_data(request, orders):
    orders_data = []
    for order in orders:
        user = User.objects.get(id=order.customer.id)
        total_products = 0
        for item in order.items.all():
            total_products += item.count

        profile = ProfileImageSerializer(user.profile, context={"request": request}).data
        orders_data.append({
            "id": order.id,
            "user_id": user.id,
            "avatar": profile["image"],
            "full_name": user.get_full_name(),
            "fulfillment_status": order.fulfillment_status,
            "delivery_method": DeliverySerializer(order.delivery_method).data,
            "total_products":round(total_products, 2),
            "products":order.items.count(),
            "total_price":  get_order_total_price(order),
            "date": order.date,
        })
    return orders_data

def get_rating(reviews):
    rating_5 = reviews.filter(rating=5).count()
    rating_4 = reviews.filter(rating=4).count()
    rating_3 = reviews.filter(rating=3).count()
    rating_2 = reviews.filter(rating=2).count()
    rating_1 = reviews.filter(rating=1).count()
    rating_0 = reviews.filter(rating=0).count()
    total_reviews = reviews.all().count()
    average = reviews.all().aggregate(Avg('rating'))["rating__avg"]
    average = average if average else 0
    rating_data = {
        "average": round(average, 1),
        "total": total_reviews,
        "values": [
            {"rating": 5, "average": getAverage(
                rating_5, total_reviews), "total": rating_5},
            {"rating": 4, "average": getAverage(
                rating_4, total_reviews), "total": rating_4},
            {"rating": 3, "average": getAverage(
                rating_3, total_reviews), "total": rating_3},
            {"rating": 2, "average": getAverage(
                rating_2, total_reviews), "total": rating_2},
            {"rating": 1, "average": getAverage(
                rating_1, total_reviews), "total": rating_1},
            {"rating": 0, "average": getAverage(
                rating_0, total_reviews), "total": rating_0},
        ],
    }
    return rating_data
