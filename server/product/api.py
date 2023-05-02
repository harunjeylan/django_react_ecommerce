from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from product.utils import Round,  getAverage
from django.db.models import Avg, Q, Count, Sum
from rest_framework import status
from datetime import datetime, timedelta
from service.utils import get_rating

from service.models import (
    Brand,
    Image,
    Vendor,
    Category,
    Collection,
    Tag,
    Option,
    Variant,
    VariantOption,
    Image,
    Organize,
    Discount,
    Country,
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
    VariantOptionSerializer,
    DiscountSerializer,
    CountrySerializer,
    ReviewSerializer,
)
from product.serializer import (
    ProductSerializer,
)
from product.utils import get_product_data


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serialized_data = []

    for product in products:
        data = get_product_data(request, product)
        serialized_data.append(data)

    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getMostSealedProducts(request):

    most_sealed_products = Product.objects.annotate(
        sealed_count=Sum("ordered__count")
    ).order_by("-sealed_count")

    if "limit" in request.GET:
        limit = int(request.GET.get("limit"))
        if limit >= 0 and limit <= most_sealed_products.count():
            most_sealed_products = most_sealed_products[:limit]

    serialized_data = []
    for product in most_sealed_products:
        data = get_product_data(request, product)
        serialized_data.append(data)

    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getTopRatedProducts(request):
    top_rated_products = Product.objects.annotate(
        rating_count=Sum("reviews__rating")
    ).order_by("-rating_count")

    if "limit" in request.GET:
        limit = int(request.GET.get("limit"))
        if limit >= 0 and limit <= top_rated_products.count():
            top_rated_products = top_rated_products[:limit]

    serialized_data = []
    for product in top_rated_products:
        data = get_product_data(request, product)
        serialized_data.append(data)

    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getRelatedProducts(request, pk):
    relatedProducts = Product.objects.all()
    serialized_data = []
    for product in relatedProducts:
        data = get_product_data(request, product)
        serialized_data.append(data)
    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWishlist(request):
    products = Product.objects.filter(wishes=request.user)
    products_data = []
    for product in products:
        product_serializer = ProductSerializer(product, context={"request": request}).data
        discount = None
        discounts = Discount.objects.filter(product=product)
        if discounts.exists():
            discount = DiscountSerializer(discounts.first()).data
        products_data.append({
            "id": product.id,
            "title": product.title,
            "description": product.description,
            "thumbnail": product_serializer["thumbnail"],
            "sale_pricing": product.sale_pricing,
            "date": product.date,
            "brand": product.brand.name,
            "category": product.organize.category.name,
            "collection": product.organize.collection.name,
            "vendor": product.organize.vendor.name,
            "discount": discount
        })
    return Response(products_data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggleWishlist(request):
    product = Product.objects.get(id=request.data.get("productId"))
    if product.wishes.contains(request.user):
        product.wishes.remove(request.user)
    else:
        product.wishes.add(request.user)

    wishlist = Product.objects.filter(wishes=request.user)
    serialized_data = []
    for product in wishlist:
        data = get_product_data(request, product)
        serialized_data.append(data)
    return Response(serialized_data, status=status.HTTP_200_OK)
# =================================================================================


@api_view(['GET'])
def searchProducts(request):
    products = []
    if "search" in request.GET:
        search = request.GET["search"]
        products = Product.objects.filter(
            Q(title__icontains=search) |
            Q(brand__name__icontains=search) |
            Q(description__icontains=search) |
            Q(organize__category__name__icontains=search) |
            Q(organize__collection__name__icontains=search) |
            Q(organize__vendor__name__icontains=search) |
            Q(organize__tags__name__icontains=search)
        ).distinct()

    serialized_data = []
    for product in products:
        data = get_product_data(request, product)
        serialized_data.append(data)
    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def searchAndFilterProducts(request):
    products = Product.objects.all()

    if "search" in request.GET:
        search = request.GET["search"]
        products = products.filter(
            Q(title__icontains=search) |
            Q(brand__name__icontains=search) |
            Q(description__icontains=search) |
            Q(organize__category__name__icontains=search) |
            Q(organize__collection__name__icontains=search) |
            Q(organize__vendor__name__icontains=search) |
            Q(organize__tags__name__icontains=search)
        ).distinct()

    if "price" in request.GET:
        price_from, price_to = request.GET["price"].split("-")
        products = products.filter(
            sale_pricing__gte=price_from,
            sale_pricing__lte=price_to
        ).distinct()

    if "brand" in request.GET:
        brands = request.GET.getlist("brand")
        products = products.filter(brand__name__in=brands).distinct()

    if "rating" in request.GET:
        ratings = request.GET.getlist("rating")
        products = products.annotate(average_rating=Round(
            Avg("reviews__rating"))).filter(average_rating__in=ratings).distinct()

    if "organize" in request.GET:
        organize_products = []
        for organize in request.GET.getlist("organize"):
            name, value = organize.split("--")
            if name in ["category", "collection", "vendor", "tags"]:
                filtering = {f"organize__{name}__name__iexact": value.lower()}
                organize_products.append(products.filter(**filtering))

        products = Product.objects.none().union(*organize_products)

    if "variant" in request.GET:
        variant_products = []
        for variant in request.GET.getlist("variant"):
            name, value = variant.split("--")
            variant_products.append(products.filter(
                variants__variant__label__iexact=name.lower(),
                variants__options__label__iexact=value.lower()
            ))
        products = Product.objects.none().union(*variant_products)

    serialized_data = []
    for product in products:
        data = get_product_data(request, product)
        serialized_data.append(data)
    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getProductsByCategory(request, category_name):
    products = []
    if category_name in ["all", None, ""]:
        products = Product.objects.all()[:20]
    else:
        products = Product.objects.filter(category=category)

    category = Category.objects.get(name=category_name)
    serialized_data = []
    for product in products:
        data = get_product_data(request, product)
        serialized_data.append(data)
    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getProductsDetails(request, pk):
    product = Product.objects.get(id=pk)
    variants = []
    for variant_option in product.variants.all():
        variants.append({
            "options": OptionSerializer(variant_option.options.all(), many=True).data,
            "variantLabel": variant_option.variant.label,
        })
    product_data = get_product_data(request, product)
    serialized_data = {
        **product_data,
        "rating": get_rating(product.reviews),
        "variants": variants,
        "brand": BrandSerializer(product.brand).data,
        "reviews":ReviewSerializer(product.reviews.all(), many=True).data,
    }
    organize = Organize.objects.filter(product=product)
    if organize.exists():
        serialized_data["organize"] = {
            "category": CategorySerializer(organize.first().category).data,
            "collection": CollectionSerializer(organize.first().collection).data,
            "vendor": VendorSerializer(organize.first().vendor).data,
            "tags": TagSerializer(organize.first().tags, many=True).data,
        }

    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProductsDataForAdmin(request, pk):
    product = Product.objects.get(id=pk)
    variants = []
    for variant_option in product.variants.all():
        options = []
        for option in variant_option.options.all():
            options.append(option.label)
        variants.append({
            "options": options,
            "variantLabel": variant_option.variant.label,
        })

    product_data = get_product_data(request, product)
    serialized_data = {
        **product_data,
        "rating": get_rating(product.reviews),
        "variants": variants,
        "brand": BrandSerializer(product.brand).data,
        "reviews":ReviewSerializer(product.reviews.all(), many=True).data,
    }
    organize = Organize.objects.filter(product=product)
    if organize.exists():
        serialized_data["organize"] = {
            "category": CategorySerializer(organize.first().category).data,
            "collection": CollectionSerializer(organize.first().collection).data,
            "vendor": VendorSerializer(organize.first().vendor).data,
            "tags": TagSerializer(organize.first().tags, many=True).data,
        }
    return Response(serialized_data, status=status.HTTP_200_OK)


# =================================================================================


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newProduct(request):
    category, created_category = Category.objects.get_or_create(
        name=request.data.get("category"))
    collection, created_collection = Collection.objects.get_or_create(
        name=request.data.get("collection"))
    vendor, created_vendor = Vendor.objects.get_or_create(
        name=request.data.get("vendor"))

    organize = Organize.objects.create(
        category=category, collection=collection, vendor=vendor)
    for tag_name in request.data.get("tags"):
        tag, created_tag = Tag.objects.get_or_create(name=tag_name)
        organize.tags.add(tag)
    brand, created = Brand.objects.get_or_create(
        name=request.data.get("brand"))
    print(request.data)
    frozen_product = request.data.get("frozenProduct").get("selected")
    max_allowed_temperature = request.data.get("frozenProduct").get("maxAllowedTemperature") if frozen_product else None

    expiry_date_selected = request.data.get("expiryDate").get("selected")
    expiry_date = request.data.get("expiryDate").get("date") if expiry_date_selected else None

    product_felids = {
        "title": request.data.get("title"),
        "brand": brand.id,
        "description": request.data.get("description"),
        "organize": organize.id,
        "regular_pricing": request.data.get("regularPrice"),
        "sale_pricing": request.data.get("salePrice"),
        "stock": request.data.get("restockQuantity"),
        "expiry_date": expiry_date,
        "fragile_product": request.data.get("fragileProduct"),
        "biodegradable": request.data.get("biodegradable"),
        "frozen_product": frozen_product,
        "max_allowed_temperature": max_allowed_temperature,
        "discount": request.data.get("discount"),
    }

    if request.data.get("shoppingType") == "fulfilled_by_seller" or request.data.get("shoppingType") == "fulfilled_by_phoenix":
        product_felids["shipping_type"] = request.data.get("shoppingType")

    product_serializer_form = ProductSerializer(data=product_felids)
    product = None
    if product_serializer_form.is_valid():
        product = product_serializer_form.save()
        global_delivery_type = request.data.get("globalDelivery")["type"]
        if global_delivery_type == "selected_countries":
            countries = []
            for country_code in request.data.get("globalDelivery")["selectedCountries"]:
                country = Country.objects.get(code=country_code)
                product.countries.add(country)
                countries.append(CountrySerializer(country).data)
        product.save()
    else:
        return Response(product_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)
    for variant_dic in request.data.get("variants"):
        variant = Variant.objects.get(label=variant_dic["variantLabel"])
        variant_option = VariantOption.objects.create(variant=variant)
        for optionLabel in variant_dic["options"]:
            option = Option.objects.get(label=optionLabel)
            variant_option.options.add(option)

        product.variants.add(variant_option)
    product.save()
    serialized_data = get_product_data(request, product)
    return Response(serialized_data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduct(request, pk):
    product = Product.objects.get(id=pk)
    product.description = request.data.get("description")
    product.title = request.data.get("title")
    category, created_category = Category.objects.get_or_create(
        name=request.data.get("category"))
    collection, created_collection = Collection.objects.get_or_create(
        name=request.data.get("collection"))
    vendor, created_vendor = Vendor.objects.get_or_create(
        name=request.data.get("vendor"))
    brand, created = Brand.objects.get_or_create(
        name=request.data.get("brand"))
    product.organize.category = category
    product.organize.collection = collection
    product.organize.vendor = vendor
    product.brand = brand

    product.organize.tags.clear()
    for tag_name in request.data.get("tags"):
        tag, created_tag = Tag.objects.get_or_create(name=tag_name)
        product.organize.tags.add(tag)

    product.organize.save()
    for variant_option in product.variants.all():
        product.variants.remove(variant_option)
        variant_option.delete()

    for variant_dic in request.data.get("variants"):
        variant = Variant.objects.get(label=variant_dic["variantLabel"])
        variant_option = VariantOption.objects.create(variant=variant)
        for optionLabel in variant_dic["options"]:
            option = Option.objects.get(label=optionLabel)
            variant_option.options.add(option)
        product.variants.add(variant_option)

    if not request.data.get("discount") in [None,"none", "null", ""]:
        discount = Discount.objects.get(id=request.data.get("discount"))
        product.discount = discount
    else:
        product.discount = None
    product.save()

    product.regular_pricing = request.data.get("regularPrice")
    product.sale_pricing = request.data.get("salePrice")
    product.stock = request.data.get("restockQuantity")
    product.expiry_date = request.data.get(
        "expiryDate")["date"] if request.data.get("expiryDate").get("selected") else None
    product.fragile_product = request.data.get("fragileProduct")
    product.biodegradable = request.data.get("biodegradable")
    product.frozen_product = request.data.get("frozenProduct").get("selected")
    product.max_allowed_temperature = request.data.get("frozenProduct").get("maxAllowedTemperature" )if request.data.get("frozenProduct").get("selected") else None

    if request.data.get("shoppingType") == "fulfilled_by_seller" or request.data.get("shoppingType") == "fulfilled_by_phoenix":
        product.shipping_type = request.data.get("shoppingType")

    countries = []
    global_delivery_type = request.data.get("globalDelivery")["type"]
    if global_delivery_type == "selected_countries":
        product.countries.clear()
        for country_code in request.data.get("globalDelivery")["selectedCountries"]:
            country = Country.objects.get(code=country_code)
            product.countries.add(country)
            countries.append(CountrySerializer(country).data)
    product.save()

    serialized_data = get_product_data(request, product)
    return Response(serialized_data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    product = Product.objects.get(id=request.data.get("productId"))
    if "thumbnail" in request.FILES:
        thumbnail = request.FILES.get("thumbnail")
        if thumbnail:
            product.thumbnail = thumbnail
            product.save()
    if "images" in request.FILES:
        images = request.FILES.getlist("images")
        for image in images:
            new_image = Image.objects.create(image=image)
            product.images.add(new_image)

    return Response({"success": "image is uploaded"}, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduct(request):
    product = Product.objects.get(id=request.data.get("id"))
    product.organize.delete()
    for image in product.images.all():
        image.delete()
    for variant in product.variants.all():
        variant.delete()
    product.delete()
    return Response({"success": "product is deleted"}, status=status.HTTP_202_ACCEPTED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteMultiProducts(request):
    products = Product.objects.filter(id__in=request.data.get("productIds"))
    for product in products:
        product.organize.delete()
        for image in product.images.all():
            image.delete()
        for variant in product.variants.all():
            variant.delete()
        product.delete()
    return Response({"success": "product is deleted"}, status=status.HTTP_202_ACCEPTED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def changeMultiProductsDiscount(request):
    products = Product.objects.filter(id__in=request.data.get("productIds"))
    if not request.data.get("discountId") in [None,"none", "null", ""]:
        discount = Discount.objects.get(id=request.data.get("discountId"))
        for product in products:
            product.discount = discount
            product.save()
    else:
        for product in products:
            product.discount = None
            product.save()

    return Response({"success": "products changed discount"}, status=status.HTTP_202_ACCEPTED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeThumbnail(request):
    product = Product.objects.get(id=request.data.get("id"))
    product.thumbnail = None
    product.save()
    return Response({"success": "thumbnail is deleted"}, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
def getRatings(request):
    rating_5 = Product.objects.annotate(average_rating=Round(
        Avg("reviews__rating"))).filter(average_rating=5).count()
    rating_4 = Product.objects.annotate(average_rating=Round(
        Avg("reviews__rating"))).filter(average_rating=4).count()
    rating_3 = Product.objects.annotate(average_rating=Round(
        Avg("reviews__rating"))).filter(average_rating=3).count()
    rating_2 = Product.objects.annotate(average_rating=Round(
        Avg("reviews__rating"))).filter(average_rating=2).count()
    rating_1 = Product.objects.annotate(average_rating=Round(
        Avg("reviews__rating"))).filter(average_rating=1).count()
    rating_0 = Product.objects.annotate(average_rating=Round(
        Avg("reviews__rating"))).filter(average_rating=0).count()
    total_reviews = Product.objects.annotate(
        average_rating=Count("reviews")).all().count()
    data = [
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
    ]
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
def addProductReview(request, pk):
    product = Product.objects.get(id=pk)
    review_serializer_form = ReviewSerializer(data={**request.data})
    if review_serializer_form.is_valid():
        review = review_serializer_form.save()
        product.reviews.add(review)
        product.save()
        return Response(ReviewSerializer(review).data, status=status.HTTP_201_CREATED)
    return Response(review_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProductsForAdmin(request):
    products = Product.objects.all()
    products_data = []
    for product in products:
        product_serializer = ProductSerializer(product, context={"request": request}).data
        discount = None
        discounts = Discount.objects.filter(product=product)
        if discounts.exists():
            discount = DiscountSerializer(discounts.first()).data
        products_data.append({
            "id": product.id,
            "title": product.title,
            "thumbnail": product_serializer["thumbnail"],
            "sale_pricing": product.sale_pricing,
            "date": product.date,
            "brand": product.brand.name,
            "category": product.organize.category.name,
            "collection": product.organize.collection.name,
            "vendor": product.organize.vendor.name,
            "discount": discount
        })
    return Response(products_data, status=status.HTTP_200_OK)
