from django.http import JsonResponse
from api.utils import Round, get_tokens_for_user, getAverage
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import  User


from django.db.models import Avg,Q,Count,Sum
from django.db.models.functions import Lower
# from api.serializer import ProductSerializer, OrderSerializer, RegistrationSerializer, UserSerializer
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.models import  User
# from api.models import Order, Product
# import hashlib
# import urllib
# from django.utils.safestring import mark_safe
from account.serializer import ProfileSerializer, UserSerializer, AddressSerializer
from account.models import Address, Profile
from api.models import (
    Brand,
    Order, 
    Product, 
    Image,
    RecommendedProduct,
    Review,
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
    Inventory,
    WishList,
    OrderdVariantOption,
    OrderdProduct,
    OrderAddress,
    )
from api.serializer import (
    BrandSerializer,
    ImageSerializer,
    OrderdVariantOptionSerializer,
    ProductSerializer,
    VendorSerializer,
    CategorySerializer,
    CollectionSerializer,
    TagSerializer,
    OptionSerializer,
    VariantSerializer,
    VariantOptionSerializer,
    ImageSerializer,
    OrganizeSerializer,
    DiscountSerializer,
    CountrySerializer,
    InventorySerializer,
    WishListSerializer,
    OrderSerializer,
    RecommendedProductSerializer,
    ReviewSerializer,
    ReviewAllSerializer,
    OrderAddressSerializer,
    OrderdProductSerializer,
)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serialized_data = []
    for product in products:
        inventory = Inventory.objects.filter(product=product)
        inventory_data = {}
        if inventory.exists():
            inventory_data = {
                **InventorySerializer(inventory.first()).data, 
                **inventory_data
            }
        serialized_data.append({
            **inventory_data,
            **ProductSerializer(product, context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
        })


    return Response(serialized_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getRecommendedProducts(request):
    recommendedProducts = RecommendedProduct.objects.all()
    serialized_data = []
    for recommendedProduct in recommendedProducts:
        
        products = [] 
        for product in recommendedProduct.products.all():
            inventory = Inventory.objects.get(product=product)
            products.append({
                **InventorySerializer(inventory).data, 
                **ProductSerializer(product, context={"request":request}).data,
                "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
                "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
            })
        serialized_data.append({
            **RecommendedProductSerializer(recommendedProduct).data,
            "products":products
        })
    return Response(serialized_data, status=status.HTTP_200_OK) 

@api_view(['GET'])
def getMostSealedProducts(request):
    limit = -1
    if request.GET.get("limit"):
        limit = int(request.GET.get("limit"))

    most_sealed_products = Product.objects.annotate(
        sealed_count = Sum("orderdproduct__count")
    ).order_by("-sealed_count")[:limit]

    serialized_data = []
    for product in most_sealed_products:
        inventory = Inventory.objects.get(product=product)
        serialized_data.append({
            **InventorySerializer(inventory).data, 
            **ProductSerializer(product, context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
        })

    return Response(serialized_data, status=status.HTTP_200_OK) 

@api_view(['GET'])
def getTopRatedProducts(request):
    limit = -1
    if request.GET.get("limit"):
        limit = int(request.GET.get("limit"))
    top_rated_products = Product.objects.annotate(
        rating_count = Sum("review__rating")
    ).order_by("-rating_count")[:limit]

    serialized_data = []
    for product in top_rated_products:
        inventory = Inventory.objects.get(product=product)
        serialized_data.append({
            **InventorySerializer(inventory).data, 
            **ProductSerializer(product, context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
        })

    return Response(serialized_data, status=status.HTTP_200_OK) 


@api_view(['GET'])
def getRelatedProducts(request, pk):
    #print(pk)
    relatedProducts = Product.objects.all()
    serialized_data = []
    for product in relatedProducts:
        inventory = Inventory.objects.filter(product=product)
        inventory_data = {}
        if inventory.exists():
            inventory_data = {
                **InventorySerializer(inventory.first()).data, 
                **inventory_data
            }
        serialized_data.append({
            **inventory_data, 
            **ProductSerializer(product, context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
        })
    return Response(serialized_data, status=status.HTTP_200_OK) 

# =================================================================================

@api_view(['GET'])
def searchProducts(request):
    products = []
    if "search" in request.GET:
        search = request.GET["search"]
        products = Product.objects.filter(
            Q(title__icontains=search)|
            Q(brand__name__icontains=search)|
            Q(description__icontains=search)|
            Q(organize__category__name__icontains=search)|
            Q(organize__collection__name__icontains=search)|
            Q(organize__vendor__name__icontains=search)|
            Q(organize__tags__name__icontains=search)
        ).distinct()

    serialized_data = [] 
    for product in products:
        inventory = Inventory.objects.filter(product=product)
        inventory_data = {}
        if inventory.exists():
            inventory_data = {
                **InventorySerializer(inventory.first()).data, 
                **inventory_data
            }
       
        serialized_data.append({
            **inventory_data,
            **ProductSerializer(product,context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(average_rating = Round(Avg("rating")))["average_rating"],
        })
    return Response(serialized_data, status=status.HTTP_200_OK) 


@api_view(['GET'])
def searchAndFilterProducts(request):
    products = Product.objects.all()
    
    if "search" in request.GET:
        search = request.GET["search"]
        products = products.filter(
            Q(title__icontains=search)|
            Q(brand__name__icontains=search)|
            Q(description__icontains=search)|
            Q(organize__category__name__icontains=search)|
            Q(organize__collection__name__icontains=search)|
            Q(organize__vendor__name__icontains=search)|
            Q(organize__tags__name__icontains=search)
        ).distinct()
    
    
    if "price" in request.GET:
        price_from, price_to = request.GET["price"].split("-")
        products = products.filter(
            inventory__sale_pricing__gte=price_from,
            inventory__sale_pricing__lte = price_to
        ).distinct()

    if "brand" in request.GET:
        brands = request.GET.getlist("brand")
        products = products.filter(brand__name__in = brands).distinct()
    
    if "rating" in request.GET:
        ratings = request.GET.getlist("rating")
        products = products.annotate(average_rating=Round(Avg("review__rating"))).filter(average_rating__in = ratings).distinct()

    if "organize" in request.GET:
        organize_products = []
        for organize in request.GET.getlist("organize"):
            name, value = organize.split("--")
            if name in ["category","collection","vendor","tags"]:
                filtering = {f"organize__{name}__name__iexact":value.lower()}
                organize_products.append(products.filter(**filtering))
            
        products = Product.objects.none().union(*organize_products)

    
    if "variant" in request.GET:
        variant_products = []
        for variant in request.GET.getlist("variant"):
            name, value = variant.split("--")
            variant_products.append(products.filter(
                variants__variant__label__iexact = name.lower(),
                variants__options__label__iexact = value.lower()
            ))
        products = Product.objects.none().union(*variant_products)

    serialized_data = [] 
    for product in products:
        inventory = Inventory.objects.filter(product=product)
        inventory_data = {}
        if inventory.exists():
            inventory_data = {
                **InventorySerializer(inventory.first()).data, 
                **inventory_data
            }
       
        serialized_data.append({
            **inventory_data,
            **ProductSerializer(product,context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(average_rating = Round(Avg("rating")))["average_rating"],
        })
    return Response(serialized_data, status=status.HTTP_200_OK) 


@api_view(['GET'])
def getProductsByCategory(request,category_name):
    products = []
    if category_name in ["all", None, ""]:
        products = Product.objects.all()[:20]
    else:
        products = Product.objects.filter(category=category)

    category = Category.objects.get(name=category_name)
    serialized_data = []
    for product in products:
        serialized_data.append({
            **ProductSerializer(product, context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
        })
    return Response(serialized_data, status=status.HTTP_200_OK) 


@api_view(['GET'])
def getProductsDetails(request,pk):
    product = Product.objects.get(id=pk)
    serialized_data = {}
    inventory = Inventory.objects.filter(product=product)
    if inventory.exists():
        serialized_data = {
            **InventorySerializer(inventory.first()).data, 
            **serialized_data
        }
    variants = []
    for variant_option in product.variants.all():
        variants.append({
            "options":OptionSerializer(variant_option.options.all(), many=True).data,
            "variantLabel":variant_option.variant.label,
        })
    rating_5 = product.review_set.filter(rating=5).count()
    rating_4 = product.review_set.filter(rating=4).count()
    rating_3 = product.review_set.filter(rating=3).count()
    rating_2 = product.review_set.filter(rating=2).count()
    rating_1 = product.review_set.filter(rating=1).count()
    rating_0 = product.review_set.filter(rating=0).count()
    total_reviews = product.review_set.all().count()
    average = product.review_set.all().aggregate(Avg('rating'))["rating__avg"]
    average = average if average else 0
    serialized_data = {
        **serialized_data,
        **ProductSerializer(product,context={"request":request}).data,
        "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
        "reviews":ReviewSerializer(product.review_set.all(), many=True).data,
        "rating":{
            "average":round(average,1),
            "total":total_reviews,
            "values":[
                {"rating":5,"average":getAverage(rating_5, total_reviews),"total":rating_5},
                {"rating":4,"average":getAverage(rating_4, total_reviews),"total":rating_4},
                {"rating":3,"average":getAverage(rating_3, total_reviews),"total":rating_3},
                {"rating":2,"average":getAverage(rating_2, total_reviews),"total":rating_2},
                {"rating":1,"average":getAverage(rating_1, total_reviews),"total":rating_1},
                {"rating":0,"average":getAverage(rating_0, total_reviews),"total":rating_0},
            ],
        },
        "variants":variants,
        "brand":BrandSerializer(product.brand).data,
    }
    organize = Organize.objects.filter(product=product)
    if organize.exists():
        serialized_data["organize"] = {
            "category":CategorySerializer(organize.first().category).data,
            "collection":CollectionSerializer(organize.first().collection).data,
            "vendor":VendorSerializer(organize.first().vendor).data,
            "tags":TagSerializer(organize.first().tags, many=True).data,
        }

        
    return Response(serialized_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProductsDataForAdmin(request,pk):
    product = Product.objects.get(id=pk)
    serialized_data = {}
    inventory = Inventory.objects.filter(product=product)
    if inventory.exists():
        serialized_data = {
            **InventorySerializer(inventory.first()).data, 
            **serialized_data
        }
    variants = []
    for variant_option in product.variants.all():
        options = []
        for option in variant_option.options.all():
            options.append(option.label)
        variants.append({
            "options":options,
            "variantLabel":variant_option.variant.label,
        })
    serialized_data = {
        **serialized_data,
        **ProductSerializer(product,context={"request":request}).data,
        "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
        "variants":variants,
        "brand":BrandSerializer(product.brand).data,
    }
    organize = Organize.objects.filter(product=product)
    if organize.exists():
        serialized_data["organize"] = {
            "category":CategorySerializer(organize.first().category).data,
            "collection":CollectionSerializer(organize.first().collection).data,
            "vendor":VendorSerializer(organize.first().vendor).data,
            "tags":TagSerializer(organize.first().tags, many=True).data,
        }
    return Response(serialized_data, status=status.HTTP_200_OK)
 
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



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newProduct(request):
    category, created_category = Category.objects.get_or_create(name=request.data.get("category"))
    collection, created_collection = Collection.objects.get_or_create(name=request.data.get("collection"))
    vendor, created_vendor = Vendor.objects.get_or_create(name=request.data.get("vendor"))

    organize = Organize.objects.create( category=category, collection=collection, vendor=vendor)
    tags = []
    for tag_name in request.data.get("tags"):
        tag, created_tag = Tag.objects.get_or_create(name=tag_name)
        organize.tags.add(tag)
        tags.append(TagSerializer(tag).data),
    brand,created = Brand.objects.get_or_create(name=request.data.get("brand"))
    product_felids = {
        "title":request.data.get("title"),
        "brand":brand.id,
        "description":request.data.get("description"),
        "organize":organize.id,
    }

    product_serializer_form = ProductSerializer(data=product_felids)
    product = None
    if product_serializer_form.is_valid():
        product = product_serializer_form.save()
    else:
        return Response(product_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)
 
    variants = []
    for variant_dic in request.data.get("variants"):
        variant = Variant.objects.get(label=variant_dic["variantLabel"])
        variant_option = VariantOption.objects.create(variant=variant)
        for optionLabel in variant_dic["options"]:
            option = Option.objects.get(label=optionLabel)
            variant_option.options.add(option)

        product.variants.add(variant_option)
        variants.append({
            **VariantOptionSerializer(variant_option).data,
            "variant":VariantSerializer(variant).data,
            "options":OptionSerializer(variant_option.options, many=True).data,
        })

    product.save()

    frozen_product=request.data.get("frozenProduct")["selected"]
    max_allowed_temperature=request.data.get("frozenProduct")["maxAllowedTemperature"] if frozen_product else None
    
    expiry_date_selectd=request.data.get("expiryDate")["selected"]
    expiry_date=request.data.get("expiryDate")["date"] if expiry_date_selectd else None

    inventory_felids = {
        "regular_pricing":request.data.get("regularPrice"),
        "sale_pricing":request.data.get("salePrice"),
        "stock":request.data.get("restockQuantity"),
        "expiry_date":expiry_date,
        "fragile_product":request.data.get("fragileProduct"),
        "biodegradable":request.data.get("biodegradable"),
        "frozen_product":frozen_product,
        "max_allowed_temperature":max_allowed_temperature,
        "product":product.id,
        "discount":request.data.get("discount"),
    }
    if request.data.get("shoppingType") == "fulfilled_by_seller" or request.data.get("shoppingType") == "fulfilled_by_phoenix":
        inventory_felids["shipping_type"] = request.data.get("shoppingType")

    inventory = None
    inventory_serializer_form = InventorySerializer(data=inventory_felids)

    countries = []
    if inventory_serializer_form.is_valid():
        inventory=inventory_serializer_form.save()
        global_delivery_type = request.data.get("globalDelivery")["type"]
        if global_delivery_type == "selected_countries":
            for country_code in request.data.get("globalDelivery")["selectedCountries"]:
                country = Country.objects.get(code = country_code)
                inventory.countries.add(country)
                countries.append(CountrySerializer(country).data)
        inventory.save()
    else:
        return Response(inventory_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)
    
    serialized_data = {
        **InventorySerializer(inventory).data,
        **ProductSerializer(product, context={"request":request}).data,
        "variants":variants,
        "images":[],
        "reviews":[],
        "organize":{
            "category":CategorySerializer(category).data,
            "collection":CollectionSerializer(collection).data,
            "vendor":VendorSerializer(vendor).data,
            "tags":tags,
        },
    }

    
    
    return Response(serialized_data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduct(request, pk):
    product = Product.objects.get(pk=pk)
    product.description = request.data.get("description")
    product.title = request.data.get("title")
    category, created_category = Category.objects.get_or_create(name=request.data.get("category"))
    collection, created_collection = Collection.objects.get_or_create(name=request.data.get("collection"))
    vendor, created_vendor = Vendor.objects.get_or_create(name=request.data.get("vendor"))
    brand,created = Brand.objects.get_or_create(name=request.data.get("brand"))
    product.organize.category=category 
    product.organize.collection=collection
    product.organize.vendor=vendor
    product.brand = brand

    tags = []
    product.organize.tags.clear()
    for tag_name in request.data.get("tags"):
        tag, created_tag = Tag.objects.get_or_create(name=tag_name)
        product.organize.tags.add(tag)
        tags.append(TagSerializer(tag).data)

    product.organize.save()

    variants = []
    for variant_option in product.variants.all():
        product.variants.remove(variant_option)
        variant_option.delete()

    for variant_dic in request.data.get("variants"):
        print(variant_dic["variantLabel"],variant_dic["options"])
        variant = Variant.objects.get(label=variant_dic["variantLabel"])
        variant_option = VariantOption.objects.create(variant=variant)
        for optionLabel in variant_dic["options"]:
            option = Option.objects.get(label=optionLabel)
            variant_option.options.add(option)
        print(variant_option)
        product.variants.add(variant_option)
        variants.append({
            **VariantOptionSerializer(variant_option).data,
            "variant":VariantSerializer(variant).data,
            "options":OptionSerializer(variant_option.options, many=True).data,
        })
    # print(product.variants)
    product.save()
    if "discount" in request.data:
        discount = Discount.objects.get(id=request.data.get("discount"))
        product.inventory.discount = discount

    product.inventory.regular_pricing=request.data.get("regularPrice")
    product.inventory.sale_pricing=request.data.get("salePrice")
    product.inventory.stock=request.data.get("restockQuantity")
    product.inventory.expiry_date=request.data.get("expiryDate")["date"] if request.data.get("expiryDate")["selected"] else None
    product.inventory.fragile_product=request.data.get("fragileProduct")
    product.inventory.biodegradable=request.data.get("biodegradable")
    product.inventory.frozen_product=request.data.get("frozenProduct")["selected"]
    product.inventory.max_allowed_temperature=request.data.get("frozenProduct")["maxAllowedTemperature"] if request.data.get("frozenProduct")["selected"] else None

    if request.data.get("shoppingType") == "fulfilled_by_seller" or request.data.get("shoppingType") == "fulfilled_by_phoenix":
        product.inventory.shipping_type = request.data.get("shoppingType")

    countries = []
    global_delivery_type = request.data.get("globalDelivery")["type"]
    if global_delivery_type == "selected_countries":
        product.inventory.countries.clear()
        for country_code in request.data.get("globalDelivery")["selectedCountries"]:
            country = Country.objects.get(code = country_code)
            product.inventory.countries.add(country)
            countries.append(CountrySerializer(country).data)
    product.inventory.save()

    serialized_data = {
        **InventorySerializer(product.inventory).data,
        **ProductSerializer(product, context={"request":request}).data,
        "variants":variants,
        "images":[],
        "reviews":[],
        "organize":{
            "category":CategorySerializer(category).data,
            "collection":CollectionSerializer(collection).data,
            "vendor":VendorSerializer(vendor).data,
            "tags":tags,
        },
    }

    
    
    return Response(serialized_data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    product = Product.objects.get(id=request.data.get("productId"))
    if "thumbnail" in request.FILES:
        thumbnail = request.FILES.get("thumbnail")
        if  thumbnail:
            product.thumbnail = thumbnail
            product.save()
    if "images" in request.FILES:
        images = request.FILES.getlist("images")
        for image in images:
            new_image = Image.objects.create(image=image)
            product.images.add(new_image)

    return Response({"success":"image is uploaded"}, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduct(request):
    product = Product.objects.get(id=request.data.get("id"))
    product.organize.delete()
    for image in product.images.all():
        image.delete()
    for variant in product.variants.all():
        variant.delete()
    product.inventory.delete()
    product.delete()
    return Response({"success":"product is deleted"}, status=status.HTTP_202_ACCEPTED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeThumbnail(request):
    product = Product.objects.get(id=request.data.get("id"))
    product.thumbnail = None
    product.save()
    return Response({"success":"thumbnail is deleted"}, status=status.HTTP_202_ACCEPTED)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeImage(request):
    image = Image.objects.get(id=request.data.get("id"))
    image.delete()
    return Response({"success":"image is deleted"}, status=status.HTTP_202_ACCEPTED)





@api_view(['GET'])
def getRatings(request):
    rating_5 = Product.objects.annotate(average_rating=Round(Avg("review__rating"))).filter(average_rating=5).count()
    rating_4 = Product.objects.annotate(average_rating=Round(Avg("review__rating"))).filter(average_rating=4).count()
    rating_3 = Product.objects.annotate(average_rating=Round(Avg("review__rating"))).filter(average_rating=3).count()
    rating_2 = Product.objects.annotate(average_rating=Round(Avg("review__rating"))).filter(average_rating=2).count()
    rating_1 = Product.objects.annotate(average_rating=Round(Avg("review__rating"))).filter(average_rating=1).count()
    rating_0 = Product.objects.annotate(average_rating=Round(Avg("review__rating"))).filter(average_rating=0).count()
    total_reviews = Product.objects.annotate(average_rating=Count("review")).all().count()
    data = [
        {"rating":5,"average":getAverage(rating_5, total_reviews),"total":rating_5},
        {"rating":4,"average":getAverage(rating_4, total_reviews),"total":rating_4},
        {"rating":3,"average":getAverage(rating_3, total_reviews),"total":rating_3},
        {"rating":2,"average":getAverage(rating_2, total_reviews),"total":rating_2},
        {"rating":1,"average":getAverage(rating_1, total_reviews),"total":rating_1},
        {"rating":0,"average":getAverage(rating_0, total_reviews),"total":rating_0},
    ]
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def addProductReview(request, pk):
    product = Product.objects.get(id=pk)
    review_serializer_form = ReviewAllSerializer(data={**request.data,"product":product.id})
    if review_serializer_form.is_valid():
        review = review_serializer_form.save()
        return Response(ReviewSerializer(review).data, status=status.HTTP_201_CREATED)
    return Response(review_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)


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
        return Response(category_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
    elif name=="collections" and value != "":
        collection_serializer = CollectionSerializer(data=value)
        if collection_serializer.is_valid():
            collection = collection_serializer.save()
            serialized_data = CollectionSerializer(collection).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(collection_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
    elif name=="vendors" and value != "":
        vendor_serializer = VendorSerializer(data=value)
        if vendor_serializer.is_valid():
            vendor = vendor_serializer.save()
            serialized_data = VendorSerializer(vendor).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(vendor_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
    elif name=="tags" and value != "":
        tag_serializer = TagSerializer(data=value)
        if tag_serializer.is_valid():
            tag = tag_serializer.save()
            serialized_data = TagSerializer(tag).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(tag_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
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
        return Response(category_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
    elif name=="collections" and value != "":
        collection = Collection.objects.get(id=request.data.get("id"))
        collection_serializer = CollectionSerializer(data=value,instance=collection)
        if collection_serializer.is_valid():
            collection = collection_serializer.save()
            serialized_data = CollectionSerializer(collection).data
            return Response(serialized_data, status=status.HTTP_202_ACCEPTED)
        return Response(collection_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
    elif name=="vendors" and value != "":
        vendor = Vendor.objects.get(id=request.data.get("id"))
        vendor_serializer = VendorSerializer(data=value, instance=vendor)
        if vendor_serializer.is_valid():
            vendor = vendor_serializer.save()
            serialized_data = VendorSerializer(vendor).data
            return Response(serialized_data, status=status.HTTP_202_ACCEPTED)
        return Response(vendor_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
    elif name=="tags" and value != "":
        tag = Tag.objects.get(id=request.data.get("id"))
        tag_serializer = TagSerializer(data=value,instance=tag)
        if tag_serializer.is_valid():
            tag = tag_serializer.save()
            serialized_data = TagSerializer(tag).data
            return Response(serialized_data, status=status.HTTP_202_ACCEPTED)
        return Response(tag_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
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
    wishlist,create = WishList.objects.get_or_create(customer=request.user)
    serialized_data = []
    for product in wishlist.products.all():
        serialized_data.append({
            **ProductSerializer(product, context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
        })
    return Response(serialized_data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def toggleWishlist(request):
    wishlist,create = WishList.objects.get_or_create(customer=request.user)
    product = Product.objects.get(id=request.data.get("productId"))
    if wishlist.products.contains(product):
        wishlist.products.remove(product)
    else:
        wishlist.products.add(product)

    serialized_data = []
    for product in wishlist.products.all():
        serialized_data.append({
            **ProductSerializer(product, context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
        })
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
        prices = products.first().inventory.sale_pricing
        count = product_data["count"]
        #============================================
        total_price += prices * count
        #============================================
        orderd_product_serializer_form = OrderdProductSerializer(data={"product":products.first().id, "count":count})
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
        inventory = Inventory.objects.filter(product=product)
        inventory_data = {}
        if inventory.exists():
            inventory_data = {
                **InventorySerializer(inventory.first()).data, 
                **inventory_data
            }
        variants = []
        for variantOption in orderd_product.variants.all():
            variants.append({
                "variantLabel":variantOption.variant.label,
                "optionLabel":variantOption.option.label,
            })
        orderd_products.append({
            **inventory_data,
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
        inventory = Inventory.objects.filter(product=product)
        inventory_data = {}
        if inventory.exists():
            inventory_data = {
                **InventorySerializer(inventory.first()).data, 
                **inventory_data
            }
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
            "sale_pricing":product.inventory.sale_pricing,
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



@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getCustomerDetails(request, pk):
    user = User.objects.get(id=pk)
    address, is_address_created = Address.objects.get_or_create(user=user)
    profile, is_profile_created = Profile.objects.get_or_create(user=user)
    customer_data = {
        **ProfileSerializer(profile,context={"request":request}).data,
        **AddressSerializer(address).data,
        **UserSerializer(user).data,
    }
    orders_data = []
    for order in Order.objects.filter(customer=user):
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

    wishlist,create = WishList.objects.get_or_create(customer=user)
    wishlist_data = []
    for product in wishlist.products.all():
        product_serializer = ProductSerializer(product, context={"request":request}).data,
        wishlist_data.append({
            "id":product.id,
            "title":product.title,
            "thumbnail":product_serializer[0]["thumbnail"],
            "sale_pricing":product.inventory.sale_pricing,
            "date":product.date,
            "brand":product.brand.name,
        })
 
    reviews = Review.objects.filter(Q(email=user.email)|Q(phone_number=user.profile.phone_number))
    
    reviews_data = []
    for review in reviews:
        product_serializer = ProductSerializer(product, context={"request":request}).data,
        reviews_data.append({
            "id":product.id,
            "title":product.title,
            "thumbnail":product_serializer[0]["thumbnail"],
            "description":review.description,
            "rating":review.rating,
            "created":review.created
        })
    response_data = {
        "customer":customer_data,
        "orders":orders_data,
        "wishlists":wishlist_data,
        "reviews":reviews_data,

    }
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getCustomers(request):
    customers_data = []
    new_customers = User.objects.order_by("-date_joined")
    for user in new_customers:
        profile = ProfileSerializer(user.profile,context={"request":request}).data
        orders = Order.objects.filter(customer=user).order_by("-date")
        total_spent = 0
        for order in orders:
            total_spent += order.total_price
        customers_data.append({
            "id":user.id,
            "full_name":user.get_full_name(),
            "email":user.email,
            "username":user.username,
            "avatar":profile["image"],
            "total_spent":total_spent,
            "phone_number":user.profile.phone_number,
            "last_order":orders.first().date,
            "orders":orders.count(),
            "date_joined":user.date_joined,
        })
   
    return Response(customers_data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getProductsForAdmin(request):
    products = Product.objects.all()
    products_data = []
    for product in products:
        product_serializer = ProductSerializer(product, context={"request":request}).data,
        products_data.append({
            "id":product.id,
            "title":product.title,
            "thumbnail":product_serializer[0]["thumbnail"],
            "sale_pricing":product.inventory.sale_pricing,
            "date":product.date,
            "brand":product.brand.name,
            "category":product.organize.category.name,
            "collection":product.organize.collection.name,
            "vendor":product.organize.vendor.name,
        })
    return Response(products_data, status=status.HTTP_200_OK)