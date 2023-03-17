from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import  User
from rest_framework import status
from datetime import datetime, timedelta, date
from django.utils import timezone
import pytz
import random
from django.db.models import Count,Q,F,Subquery,Sum
from django.db.models.functions import (
   ExtractYear, ExtractMonth, ExtractDay, ExtractWeekDay,
   ExtractHour, ExtractMinute, ExtractSecond,
   TruncDay,
)
from api.models import Order, OrderdProduct
  
import itertools

from account.serializer import ProfileSerializer, UserSerializer
from api.utils import getAverage
  



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDashboardData(request):
    today = datetime.today()
    # =====================================================================================
    last_7_day = today - timedelta(days=7)
    last_14_day = today - timedelta(days=14)

    two_week_orders = Order.objects.filter(
            date__gt= last_14_day, date__lte=last_7_day
    )
    one_week_orders = Order.objects.filter(
            date__gt= last_7_day
    )

    last_week_orders = one_week_orders.annotate(
            day=ExtractDay('date')
        ).values('day').annotate(
            count=Count('id'),
            status=F("fulfillment_status")
        ).values('day', 'count',"status")
    
    last_week_orders_data = {
        "total_orders":one_week_orders.count(),
        "increasing":getAverage(one_week_orders.count(), two_week_orders.count()+one_week_orders.count())
    }
    weak_orders_data = []
    weak_orders_iterator = itertools.groupby(last_week_orders, lambda x : x["day"])
    for key, groups in weak_orders_iterator:
        data = {"date":key,"complete":0,"failed":0,"pending":0,"cancelled":0,}
        for group in groups:
            data[group["status"]] = group["count"]
        weak_orders_data.append(data)
    last_week_orders_data["data"] = weak_orders_data

    # =====================================================================================
    
    # # print(last_week_orders_data)
    one_week_products = OrderdProduct.objects.filter(order__date__gt=last_7_day)
    two_week_products = OrderdProduct.objects.filter(order__date__gt= last_14_day, order__date__lte=last_7_day)
   
    last_week_products = one_week_products.values("product").annotate(
        product_count=Sum("count") 
    ).order_by("-product_count")[:3].values("product_count","product","product__title")
    prev_week_products = two_week_products.values("product").annotate(
        product_count=Sum("count") 
    ).order_by("-product_count")[:3].values("product_count","product","product__title")
        
    last_week_total_products = 0
    prev_week_total_products = 0
    for product in last_week_products:
        last_week_total_products += product["product_count"]
    for product in prev_week_products:
        prev_week_total_products += product["product_count"]

    
    print(last_week_products) 
    last_week_products_data = {
        "total_products":last_week_total_products,
        "increasing":getAverage(last_week_total_products, prev_week_total_products+last_week_total_products)
    }
    year_products_data = []
    for last_week_product in last_week_products:
        orderd_product = one_week_products.filter(
            product__id=last_week_product["product"]
        ).annotate(
            day=ExtractDay('order__date')
        ).values('day').annotate(
            day_count = Count("day"),
            product_count=Sum("count")
        ).values("day","product_count")
        # print(orderd_product)
        products = []
        products_iterator = itertools.groupby(orderd_product, lambda x : x["day"])
        for key, groups in products_iterator:
            data = {"x":key,"y":0}
            for group in groups:
                data["y"] = group["product_count"]
            products.append(data)
        # print(products_data)
        year_products_data.append({
            "id":last_week_product["product__title"],
            "data":products
        })
    last_week_products_data["data"] = year_products_data
    # =====================================================================================

    # =====================================================================================
    last_1_year = today - timedelta(days=365)
    last_2_year = today - timedelta(days=728)

    two_year_orders = Order.objects.filter(
            date__gt= last_2_year, date__lte=last_1_year
    )
    one_year_orders = Order.objects.filter(
            date__gt= last_1_year
    )

    last_year_orders = one_year_orders.annotate(
            month=ExtractMonth('date')
        ).values('month').annotate(
            count=Count('id'),
            status=F("fulfillment_status")
        ).values('month', 'count',"status")
    
    last_year_orders_data = {
        "total_orders":one_year_orders.count(),
        "increasing":getAverage(one_year_orders.count(), two_year_orders.count()+one_year_orders.count())
    }
    year_orders_data = []
    year_orders_iterator = itertools.groupby(last_year_orders, lambda x : x["month"])
    for key, groups in year_orders_iterator:
        data = {"date":key,"complete":0,"failed":0,"pending":0,"cancelled":0,}
        for group in groups:
            data[group["status"]] = group["count"]
        year_orders_data.append(data)
    last_year_orders_data["data"] = year_orders_data

    # =====================================================================================
    
    # # print(last_year_orders_data)
    one_year_products = OrderdProduct.objects.filter(order__date__gt=last_7_day)
    two_year_products = OrderdProduct.objects.filter(order__date__gt= last_14_day, order__date__lte=last_7_day)
   
    last_year_products = one_year_products.values("product").annotate(
        product_count=Sum("count") 
    ).order_by("-product_count")[:3].values("product_count","product","product__title")
    prev_year_products = two_year_products.values("product").annotate(
        product_count=Sum("count") 
    ).order_by("-product_count")[:3].values("product_count","product","product__title")
        
    last_year_total_products = 0
    prev_year_total_products = 0
    for product in last_year_products:
        last_year_total_products += product["product_count"]
    for product in prev_year_products:
        prev_year_total_products += product["product_count"]

    
    print(last_year_products) 
    last_year_products_data = {
        "total_products":last_year_total_products,
        "increasing":getAverage(last_year_total_products, prev_year_total_products+last_year_total_products)
    }
    year_products_data = []
    for last_year_product in last_year_products:
        orderd_product = one_year_products.filter(
            product__id=last_year_product["product"]
        ).annotate(
            month=ExtractMonth('order__date')
        ).values('month').annotate(
            month_count = Count("month"),
            product_count=Sum("count")
        ).values("month","product_count")
        # print(orderd_product)
        products = []
        products_iterator = itertools.groupby(orderd_product, lambda x : x["month"])
        for key, groups in products_iterator:
            data = {"x":key,"y":0}
            for group in groups:
                data["y"] = group["product_count"]
            products.append(data)
        # print(products_data)
        year_products_data.append({
            "id":last_year_product["product__title"],
            "data":products
        })
    last_year_products_data["data"] = year_products_data
    # =====================================================================================

    new_orders = Order.objects.all().order_by("-date")[:100].annotate(
        total=F("total_price")
    ).values("id","fulfillment_status","customer","total","date","delivery_method")
    
    new_orders_data = []
    for new_order in new_orders:
        user = User.objects.get(id=new_order["customer"])
        profile = ProfileSerializer(user.profile,context={"request":request}).data
        
        new_orders_data.append({
            **new_order,
            "user_id":user.id,
            "full_name":user.get_full_name(),
            "avatar":profile["image"]
        })
    
    
    # =====================================================================================
    # =====================================================================================
    
    new_customers_data = []
    new_customers = User.objects.order_by("-date_joined")[:100]
    for user in new_customers:
        profile = ProfileSerializer(user.profile,context={"request":request}).data
        orders = Order.objects.filter(customer=user).order_by("-date")
        total_spent = 0
        for order in orders:
            total_spent += order.total_price
        new_customers_data.append({
            "id":user.id,
            "full_name":user.get_full_name(),
            "email":user.email,
            "avatar":profile["image"],
            "total_spent":total_spent,
            "last_order":orders.first().date,
            "orders":orders.count(),
        })
    
    # =====================================================================================
    response_data = {
        "last_week_products":last_week_products_data,
        "last_week_orders":last_week_orders_data,
        "last_year_products":last_year_products_data,
        "last_year_orders":last_year_orders_data,
        "new_orders":new_orders_data,
        "new_customers":new_customers_data,
    }
    return Response(response_data, status=status.HTTP_200_OK)