from django.http import JsonResponse
from api.utils import Round, get_tokens_for_user
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from django.db.models import Avg,Q,Count
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
    Country,
    Inventory,
    WishList
    )
from api.serializer import (
    BrandSerializer,
    ImageSerializer,
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
    CountrySerializer,
    InventorySerializer,
    WishListSerializer,
    OrderSerializer,
    RecommendedProductSerializer,
    ReviewSerializer,
    ReviewAllSerializer,
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProducts(request):
    products = Product.objects.all()
    serialized_data = []
    for product in products:
        serialized_data.append({
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
def getRelatedProducts(request, pk):
    #print(pk)
    relatedProducts = Product.objects.all()
    serialized_data = []
    for product in relatedProducts:
        inventory = Inventory.objects.get(product=product)
        serialized_data.append({
            **InventorySerializer(inventory).data, 
            **ProductSerializer(product, context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
        })
    return Response(serialized_data, status=status.HTTP_200_OK) 

# =================================================================================
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
        products = products.annotate(avetage_rating=Round(Avg("review__rating"))).filter(avetage_rating__in = ratings).distinct()

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
def getProductsDetailes(request,pk):
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
    serialized_data = {
        **serialized_data,
        **ProductSerializer(product,context={"request":request}).data,
        "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
        "reviews":ReviewSerializer(product.review_set.all(), many=True).data,
        "rating":{
            "average":round(product.review_set.all().aggregate(Avg('rating'))["rating__avg"],1),
            "total":total_reviews,
            "values":[
                {"rating":5,"average":rating_5/total_reviews * 100,"total":rating_5},
                {"rating":4,"average":rating_4/total_reviews * 100,"total":rating_4},
                {"rating":3,"average":rating_3/total_reviews * 100,"total":rating_3},
                {"rating":2,"average":rating_2/total_reviews * 100,"total":rating_2},
                {"rating":1,"average":rating_1/total_reviews * 100,"total":rating_1},
                {"rating":0,"average":rating_0/total_reviews * 100,"total":rating_0},
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

# =================================================================================
@api_view(['GET'])
def getAllCategory(request):
    return Response([], status=status.HTTP_200_OK)


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
    product_feilds = {
        "title":request.data.get("title"),
        "brand":brand.id,
        "description":request.data.get("description"),
        "organize":organize.id,
    }

    product_serializer_form = ProductSerializer(data=product_feilds)
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

    inventory_feilds = {
        "regular_pricing":request.data.get("regularPrice"),
        "sale_pricing":request.data.get("salePrice"),
        "stock":request.data.get("restockQuantity"),
        "expiry_date":expiry_date,
        "fragile_product":request.data.get("fragileProduct"),
        "biodegradable":request.data.get("biodegradable"),
        "frozen_product":frozen_product,
        "max_allowed_temperature":max_allowed_temperature,
        "product":product.id,
    }
    if request.data.get("shoppingType") == "fulfilled_by_seller" or request.data.get("shoppingType") == "fulfilled_by_phoenix":
        inventory_feilds["shipping_type"] = request.data.get("shoppingType")

    inventory = None
    inventory_serializer_form = InventorySerializer(data=inventory_feilds)

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


@api_view(['GET'])
def getRatings(request):
    rating_5 = Product.objects.annotate(avetage_rating=Round(Avg("review__rating"))).filter(avetage_rating=5).count()
    rating_4 = Product.objects.annotate(avetage_rating=Round(Avg("review__rating"))).filter(avetage_rating=4).count()
    rating_3 = Product.objects.annotate(avetage_rating=Round(Avg("review__rating"))).filter(avetage_rating=3).count()
    rating_2 = Product.objects.annotate(avetage_rating=Round(Avg("review__rating"))).filter(avetage_rating=2).count()
    rating_1 = Product.objects.annotate(avetage_rating=Round(Avg("review__rating"))).filter(avetage_rating=1).count()
    rating_0 = Product.objects.annotate(avetage_rating=Round(Avg("review__rating"))).filter(avetage_rating=0).count()
    total_reviews = Product.objects.annotate(avetage_rating=Count("review")).all().count()
    data = [
        {"rating":5,"average":rating_5/total_reviews * 100,"total":rating_5},
        {"rating":4,"average":rating_4/total_reviews * 100,"total":rating_4},
        {"rating":3,"average":rating_3/total_reviews * 100,"total":rating_3},
        {"rating":2,"average":rating_2/total_reviews * 100,"total":rating_2},
        {"rating":1,"average":rating_1/total_reviews * 100,"total":rating_1},
        {"rating":0,"average":rating_0/total_reviews * 100,"total":rating_0},
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
    return Response({"error":"you have to spasify the name"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteOrganize(request):
    name = request.data.get("name")
    if name=="categories":
        category = Category.objects.get(id=request.data.get("id"))
        category.delete()
        return Response({"seccess":"deleted successfull"}, status=status.HTTP_202_ACCEPTED)
    elif name=="collections":
        collection = Collection.objects.get(id=request.data.get("id"))
        collection.delete()
        return Response({"seccess":"deleted successfull"}, status=status.HTTP_202_ACCEPTED)
    elif name=="vendors":
        vendor = Vendor.objects.get(id=request.data.get("id"))
        vendor.delete()
        return Response({"seccess":"deleted successfull"}, status=status.HTTP_202_ACCEPTED)
    elif name=="tags":
        tag = Tag.objects.get(id=request.data.get("id"))
        tag.delete()
        return Response({"seccess":"deleted successfull"}, status=status.HTTP_202_ACCEPTED)
    return Response({"error":"you have to spasify the name"}, status=status.HTTP_400_BAD_REQUEST)

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
def setGetWishlist(request):
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

