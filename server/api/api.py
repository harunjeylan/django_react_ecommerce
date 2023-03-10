from django.http import JsonResponse
from api.utils import get_tokens_for_user
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from django.db.models import Avg
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
    products = [] 
    for product in Product.objects.all():
        inventory = Inventory.objects.filter(product=product)
        inventory_data = {}
        if inventory.exists():
            inventory_data = {
                **InventorySerializer(inventory.first()).data, 
                **inventory_data
            }
       
        products.append({
            **inventory_data,
            **ProductSerializer(product,context={"request":request}).data,
            "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
            "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
        })
    return Response(products, status=status.HTTP_200_OK) 


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
    serialized_data = {
        **serialized_data,
        **ProductSerializer(product,context={"request":request}).data,
        "images":ImageSerializer(product.images.all(), many=True, context={"request":request}).data,
        "reviews":ReviewSerializer(product.review_set.all(), many=True).data,
        "rating":product.review_set.all().aggregate(Avg('rating'))["rating__avg"],
        "variants":variants,
        "organize":{
            "category":CategorySerializer(product.organize.category).data,
            "collection":CollectionSerializer(product.organize.collection).data,
            "vendor":VendorSerializer(product.organize.vendor).data,
            "tags":TagSerializer(product.organize.tags, many=True).data,
        },
        "brand":BrandSerializer(product.brand).data,
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




@api_view(['POST','GET'])
@permission_classes([IsAuthenticated])
def setGetWishlist(request):
    wishlist,create = WishList.objects.get_or_create(customer=request.user)
    if request.method == "POST":
        for productId in request.data.get("products"):
            product = Product.objects.get(id=productId)
            wishlist.products.add(product)

    wishlist = WishList.objects.get(customer=request.user)
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

