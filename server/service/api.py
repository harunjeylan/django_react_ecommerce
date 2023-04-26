from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import  User
from rest_framework import status
from datetime import datetime, timedelta
from django.db.models import Avg,Count,Q,F,Sum

from django.db.models.functions import (
   ExtractYear, ExtractMonth, ExtractDay, ExtractWeekDay,
   ExtractHour, ExtractMinute, ExtractSecond,
   TruncDay,
)

import itertools

from account.serializer import ProfileSerializer
from service.utils import getAverage
  
from account.serializer import ProfileSerializer
from service.models import (
    Brand,
    Image,
    Vendor,
    Category,
    Collection,
    Tag,
    Option,
    Variant,
    Image,
    Discount,
    OrderdItem,
    Order,
)
from product.models import (
    Product, 
    )

from service.serializer import (
    BrandSerializer,
    ImageSerializer,
    VendorSerializer,
    CategorySerializer,
    CollectionSerializer,
    TagSerializer,
    OptionSerializer,
    VariantSerializer,
    DiscountSerializer,
    OrderSerializer,
    OrderAddress,
    OrderAddressSerializer,
    OrderdItemSerializer,
    OrderdVariantOption,
)
from product.serializer import (
    ProductSerializer,
)




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
    one_week_products = OrderdItem.objects.filter(order__date__gt=last_7_day)
    two_week_products = OrderdItem.objects.filter(order__date__gt= last_14_day, order__date__lte=last_7_day)
   
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
    one_year_products = OrderdItem.objects.filter(order__date__gt=last_7_day)
    two_year_products = OrderdItem.objects.filter(order__date__gt= last_14_day, order__date__lte=last_7_day)
   
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

# =================================================================================
@api_view(['GET'])
def getAllCategory(request):
    categories = CategorySerializer(Category.objects.all(), many=True).data
    return Response(categories, status=status.HTTP_200_OK)

# =================================================================================
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getOrganizes(request):
    serialized_data = {
        "categories":CategorySerializer(Category.objects.all(), many=True).data,
        "collections":CollectionSerializer(Collection.objects.all(), many=True).data,
        "vendors":VendorSerializer(Vendor.objects.all(), many=True).data,
        "tags":TagSerializer(Tag.objects.all(), many=True).data,
    }
    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeImage(request):
    image = Image.objects.get(id=request.data.get("id"))
    image.delete()
    return Response({"success":"image is deleted"}, status=status.HTTP_202_ACCEPTED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrganize(request):
    name = request.data.get("name")
    value = {"name":request.data.get("label")}
    if name=="categories" and value != "":
        category_serializer = CategorySerializer(data=value)
        if category_serializer.is_valid():
            category = category_serializer.save()
            serialized_data = CategorySerializer(category).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif name=="collections" and value != "":
        collection_serializer = CollectionSerializer(data=value)
        if collection_serializer.is_valid():
            collection = collection_serializer.save()
            serialized_data = CollectionSerializer(collection).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(collection_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif name=="vendors" and value != "":
        vendor_serializer = VendorSerializer(data=value)
        if vendor_serializer.is_valid():
            vendor = vendor_serializer.save()
            serialized_data = VendorSerializer(vendor).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(vendor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif name=="tags" and value != "":
        tag_serializer = TagSerializer(data=value)
        if tag_serializer.is_valid():
            tag = tag_serializer.save()
            serialized_data = TagSerializer(tag).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(tag_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({"error":"you have to spasify the name"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST','PUT'])
@permission_classes([IsAuthenticated])
def updateOrganize(request):
    name = request.data.get("name")
    value = {"name":request.data.get("label")}
    if name=="categories" and value != "":
        category = Category.objects.get(id=request.data.get("id"))
        category_serializer = CategorySerializer(data=value, instance=category)
        if category_serializer.is_valid():
            category = category_serializer.save()
            serialized_data = CategorySerializer(category).data
            return Response(serialized_data, status=status.HTTP_202_ACCEPTED)
        return Response(category_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif name=="collections" and value != "":
        collection = Collection.objects.get(id=request.data.get("id"))
        collection_serializer = CollectionSerializer(data=value,instance=collection)
        if collection_serializer.is_valid():
            collection = collection_serializer.save()
            serialized_data = CollectionSerializer(collection).data
            return Response(serialized_data, status=status.HTTP_202_ACCEPTED)
        return Response(collection_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif name=="vendors" and value != "":
        vendor = Vendor.objects.get(id=request.data.get("id"))
        vendor_serializer = VendorSerializer(data=value, instance=vendor)
        if vendor_serializer.is_valid():
            vendor = vendor_serializer.save()
            serialized_data = VendorSerializer(vendor).data
            return Response(serialized_data, status=status.HTTP_202_ACCEPTED)
        return Response(vendor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif name=="tags" and value != "":
        tag = Tag.objects.get(id=request.data.get("id"))
        tag_serializer = TagSerializer(data=value,instance=tag)
        if tag_serializer.is_valid():
            tag = tag_serializer.save()
            serialized_data = TagSerializer(tag).data
            return Response(serialized_data, status=status.HTTP_202_ACCEPTED)
        return Response(tag_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({"error":"you have to specify the name"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteOrganize(request):
    name = request.data.get("name")
    if name=="categories":
        category = Category.objects.get(id=request.data.get("id"))
        category.delete()
        return Response({"success":"deleted successful"}, status=status.HTTP_202_ACCEPTED)
    elif name=="collections":
        collection = Collection.objects.get(id=request.data.get("id"))
        collection.delete()
        return Response({"success":"deleted successful"}, status=status.HTTP_202_ACCEPTED)
    elif name=="vendors":
        vendor = Vendor.objects.get(id=request.data.get("id"))
        vendor.delete()
        return Response({"success":"deleted successful"}, status=status.HTTP_202_ACCEPTED)
    elif name=="tags":
        tag = Tag.objects.get(id=request.data.get("id"))
        tag.delete()
        return Response({"success":"deleted successful"}, status=status.HTTP_202_ACCEPTED)
    return Response({"error":"you have to specify the name"}, status=status.HTTP_400_BAD_REQUEST)

# =================================================================================
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getAllBrands(request):
    brands = BrandSerializer(Brand.objects.all(), many=True).data
    return Response(brands, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addBrand(request):
    if request.data.get("name") != "":
        brand,created = Brand.objects.get_or_create(name=request.data.get("name"))
        return Response(BrandSerializer(brand).data, status=status.HTTP_200_OK)
    else:
        brands = Brand.objects.filter(name=request.data.get("name"))
        for brand in brands:
            brand.delete()
    return Response({}, status=status.HTTP_200_OK)

@api_view(['POST','PUT'])
@permission_classes([IsAuthenticated])
def updateBrand(request):
    brand = Brand.objects.get(id=request.data.get("id"))
    if request.data.get("name") != "":
        brand.name = request.data.get("name")
        brand.save()
    else:
        brands = Brand.objects.filter(name=request.data.get("name"))
        for brand in brands:
            brand.delete()
    return Response(BrandSerializer(brand).data, status=status.HTTP_202_ACCEPTED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBrand(request):
    brand = Brand.objects.get(id=request.data.get("id"))
    brand.delete()
    return Response({"success":"deleted"}, status=status.HTTP_202_ACCEPTED)

# =================================================================================
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getAllDiscounts(request):
    discounts = DiscountSerializer(Discount.objects.order_by("-end_date"), many=True).data
    return Response(discounts, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addDiscount(request):
    discount_serializer_form = DiscountSerializer(data=request.data)
    if discount_serializer_form.is_valid():
        discount = discount_serializer_form.save()
        return Response(DiscountSerializer(discount).data, status=status.HTTP_201_CREATED)
    return Response(discount_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST','PUT'])
@permission_classes([IsAuthenticated])
def updateDiscount(request):
    discount = Discount.objects.get(id=request.data.get("id"))
    discount_serializer_form = DiscountSerializer(data=request.data, instance=discount)
    if discount_serializer_form.is_valid():
        discount = discount_serializer_form.save()
        return Response(DiscountSerializer(discount).data, status=status.HTTP_202_ACCEPTED)
    return Response(discount_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteDiscount(request):
    discount = Discount.objects.get(id=request.data.get("id"))
    discount.delete()
    return Response({"success":"deleted"}, status=status.HTTP_202_ACCEPTED)

# =================================================================================
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getAllVariants(request):
    serialized_data = []
    for variant in Variant.objects.all():
        options = []
        for option in variant.options.all():
            options.append(OptionSerializer(option).data)
        serialized_data.append({
            **VariantSerializer(variant).data,
            "options":options,
        })
  
    return Response(serialized_data, status=status.HTTP_200_OK)



@api_view(['POST','PUT'])
@permission_classes([IsAuthenticated])
def addVariant(request):
    variant,created = Variant.objects.get_or_create(label=request.data.get("label"))
    options = []
    for option_obj in request.data.get("options"):
        option,created = Option.objects.get_or_create(label=option_obj["label"])
        variant.options.add(option)
        options.append(OptionSerializer(option).data)
  
    return Response({**VariantSerializer(variant).data,"options":options}, status=status.HTTP_200_OK)

@api_view(['POST','PUT'])
@permission_classes([IsAuthenticated])
def updateVariant(request):
    variant = Variant.objects.get(id=request.data.get("id"))
    variant.label = request.data.get("label")
    variant.save()
    options = []
    for option_obj in request.data.get("options"):
        same_option = Option.objects.filter(label=option_obj["label"])
        if not same_option.exists():
            if "id" in option_obj:
                option = Option.objects.get(id=option_obj["id"])
                option.label = option_obj["label"]
                option.save()
                if not variant.options.contains(option):
                    variant.options.add(option)
                options.append(OptionSerializer(option).data)
            else:
                option,created = Option.objects.get_or_create(label=option_obj["label"])
                if not variant.options.contains(option):
                    variant.options.add(option)
                options.append(OptionSerializer(option).data)
        elif not variant.options.contains(same_option.first()):
            if "id" in option_obj:
                option = Option.objects.get(id=option_obj["id"])
                variant.options.remove(option)
                if not Variant.objects.filter(options = option).exists():
                    option.delete()
            variant.options.add(same_option.first())
            options.append(OptionSerializer(same_option.first()).data)
        else:
            options.append(OptionSerializer(same_option.first()).data)


    return Response({**VariantSerializer(variant).data,"options":options}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteVariant(request):
    variant = Variant.objects.get(id=request.data.get("id"))
    options = variant.options.all()
    variant.delete()
    for option in options:
        if not Variant.objects.filter(options = option).exists():
            option.delete()
    return Response({"success":"deleted"}, status=status.HTTP_202_ACCEPTED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteOption(request):
    variant = Variant.objects.get(id=request.data.get("variantId"))
    option = Option.objects.get(id=request.data.get("optionId"))
    variant.options.remove(option)
    if not Variant.objects.filter(options = option).exists():
        option.delete()
    return Response({"success":"deleted"}, status=status.HTTP_202_ACCEPTED)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWishlist(request):
    # wishlist,create = WishList.objects.get_or_create(customer=request.user)
    serialized_data = []
    # for product in wishlist.products.all():
    #     serialized_data.append({
    #         **ProductSerializer(product, context={"request":request}).data,
    #         "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
    #         "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
    #     })
    return Response(serialized_data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def toggleWishlist(request):
    # wishlist,create = WishList.objects.get_or_create(customer=request.user)
    # product = Product.objects.get(id=request.data.get("productId"))
    # if wishlist.products.contains(product):
    #     wishlist.products.remove(product)
    # else:
    #     wishlist.products.add(product)

    serialized_data = []
    # for product in wishlist.products.all():
    #     serialized_data.append({
    #         **ProductSerializer(product, context={"request":request}).data,
    #         "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
    #         "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
    #     })
    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def addOrder(request):
    billing_address_data = request.data.get("billingAddress")
    shipping_address_data = request.data.get("shippingAddress")
    isSame_address = shipping_address_data["isSameAddress"]
    delivery_method_data = request.data.get("deliveryMethod")
    
    billing_address_serializer_form = OrderAddressSerializer(data=billing_address_data)
    shipping_address_serializer_form = OrderAddressSerializer(data=shipping_address_data)

    billing_address = None
    if billing_address_serializer_form.is_valid():
        billing_address, created = OrderAddress.objects.get_or_create(**billing_address_serializer_form.data)
    else:
        return Response(billing_address_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)

    shipping_address = None
    if isSame_address and billing_address != None:
        shipping_address = billing_address
    elif shipping_address_serializer_form.is_valid():
        shipping_address , created = OrderAddress.objects.get_or_create(**shipping_address_serializer_form.data)
    else:
        return Response(shipping_address_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)

    orderd_products = []
    total_price = 0
    for product_data in request.data.get("products"):
        variants_data = product_data["variants"]
        products = Product.objects.filter(id=product_data["id"])
        if not products.exists():
            return Response([{"product":"product is not exist"}], status=status.HTTP_400_BAD_REQUEST)
        prices = products.first().sale_pricing
        count = product_data["count"]
        #============================================
        total_price += prices * count
        #============================================
        orderd_product_serializer_form = OrderdItemSerializer(data={"product":products.first().id, "count":count})
        if orderd_product_serializer_form.is_valid():
            orderd_product = orderd_product_serializer_form.save()
            for variant_data in variants_data:
                variantLabel = variant_data["variantLabel"]
                optionLabel = variant_data["optionLabel"]
                variant = Variant.objects.get(label=variantLabel)
                option = Option.objects.get(label=optionLabel)
                variant_option, created = OrderdVariantOption.objects.get_or_create(variant=variant, option=option)
                orderd_product.variants.add(variant_option)
            orderd_products.append(orderd_product.id)
        else:
            return Response(orderd_product_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)

    order_serializer_form = OrderSerializer(data={
        "customer":request.user.id,
        "products":orderd_products,
        "billing_address":billing_address.id,
        "shipping_address":shipping_address.id,
        "delivery_method":delivery_method_data,
        "total_price":total_price,
        })
    if order_serializer_form.is_valid():
        order = order_serializer_form.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)
    return Response(order_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getOrders(request):

    orders = Order.objects.filter(customer=request.user)
    orders_data = []
    for order in orders:
        orders_data.append({
            "id":order.id,
            "date":order.date,
            "total_price":order.total_price,
            "status":order.fulfillment_status,
        })
    return Response(orders_data, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getOrderDetails(request, pk):
    order = Order.objects.get(id=pk)

    orderd_products = []
    for orderd_product in order.products.all():
        count = orderd_product.count
        product = orderd_product.product
        variants = []
        for variantOption in orderd_product.variants.all():
            variants.append({
                "variantLabel":variantOption.variant.label,
                "optionLabel":variantOption.option.label,
            })
        orderd_products.append({
            **ProductSerializer(product, context={"request":request}).data,
            "count":orderd_product.count,
            "variants":variants,
        })
    order_data = {
        **OrderSerializer(order).data,
        "products":orderd_products,
        "billing_address":OrderAddressSerializer(order.billing_address).data,
        "shipping_address":OrderAddressSerializer(order.shipping_address).data,
    }
    return Response(order_data, status=status.HTTP_200_OK)



@api_view(['POST','PUT'])
@permission_classes([IsAuthenticated])  
def updateOrder(request):
    print(request.data)
    return Response({})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  
def deleteOrder(request):
    print(request.data)
    return Response({})
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getOrdersForAdmin(request):
    orders = Order.objects.all()
    orders_data = []
    for order in orders:
        user = User.objects.get(id=order.customer.id)
        profile = ProfileSerializer(user.profile,context={"request":request}).data
        orders_data.append({
            "id":order.id,
            "user_id":user.id,
            "avatar":profile["image"],
            "full_name":user.get_full_name(),
            "fulfillment_status":order.fulfillment_status,
            "delivery_method":order.delivery_method,
            "total_price":order.total_price,
            "date":order.date,
        })
    return Response(orders_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getOrderDetailsForAdmin(request, pk):
    order = Order.objects.get(id=pk)

    orderd_products = []
    for orderd_product in order.products.all():
        product = orderd_product.product
        variants = []
        for variantOption in orderd_product.variants.all():
            variants.append({
                "variantLabel":variantOption.variant.label,
                "optionLabel":variantOption.option.label,
            })
        product_serializer = ProductSerializer(product, context={"request":request}).data,
        orderd_products.append({
            "id":product.id,
            "title":product.title,
            "thumbnail":product_serializer[0]["thumbnail"],
            "sale_pricing":product.sale_pricing,
            "count":orderd_product.count,
            "variants":variants,
        })
    order_data = {
        **OrderSerializer(order).data,
        "products":orderd_products,
        "billing_address":OrderAddressSerializer(order.billing_address).data,
        "shipping_address":OrderAddressSerializer(order.shipping_address).data,
    }
    return Response(order_data, status=status.HTTP_200_OK)

