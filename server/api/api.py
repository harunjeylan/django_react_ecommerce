from django.http import JsonResponse
from api.utils import get_tokens_for_user
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# from api.serializer import ProductSerializer, OrderSerializer, RegistrationSerializer, UserSerializer
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.models import  User
# from api.models import Order, Product
from api.models import (
    Order, 
    Product, 
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
    Country,
    Inventory,
    WishList
    )
from api.serializer import (
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
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProducts(request):
    return Response(ProductSerializer(Product.objects.all(), many=True).data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrganizes(request):
    serialized_data = {
        "category":CategorySerializer(Category.objects.all(), many=True).data,
        "collection":CollectionSerializer(Collection.objects.all(), many=True).data,
        "vendor":VendorSerializer(Vendor.objects.all(), many=True).data,
        "tag":TagSerializer(Tag.objects.all(), many=True).data,
    }
    return Response(serialized_data, status=status.HTTP_200_OK)

    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newProduct(request):
    print(request.data)
    category, created_category = Category.objects.get_or_create(name=request.data.get("organize")["category"])
    collection, created_collection = Collection.objects.get_or_create(name=request.data.get("organize")["collection"])
    vendor, created_vendor = Vendor.objects.get_or_create(name=request.data.get("organize")["category"])

    organize = Organize.objects.create( category=category, collection=collection, vendor=vendor)

    for tag_id in request.data.get("organize")["tags"]:
        tag, created_tag = Tag.objects.get_or_create(id=tag_id)
        organize.tags.add(tag)
    
    organize.save()

    product_feilds = {
        "title":request.data.get("title"),
        "brand":request.data.get("brand"),
        "description":request.data.get("description"),
        # "thumbnail":request.data.get("thumbnail")[0]["file"],
        "organize":organize.id,
    }

    product_serializer_form = ProductSerializer(data=product_feilds)

    product = None
    if product_serializer_form.is_valid():
        product = product_serializer_form.save()
    else:
        return Response(product_serializer_form.errors, status=status.HTTP_400_BAD_REQUEST)

    
    images = []
    for image in request.data.get("images"):
        print(image["file"])
        images_serializer = ImageSerializer(data={"image":image["file"]})
        if images_serializer.is_valid():
            new_image = images_serializer.save()
            product.images.add(new_image)
            images.append(ImageSerializer(new_image).data)
    
    variants = []
    for variant_dic in request.data.get("variants"):
        option = Option.objects.get(id=variant_dic["optionId"])
        variant = Variant.objects.get(id=variant_dic["variantId"])
        variant_option = VariantOption.objects.create(option=option, variant=variant)
        product.variants.add(variant_option)
        variants.append({
            **VariantOptionSerializer(variant_option).data,
            "variant":VariantSerializer(variant).data,
            "option":OptionSerializer(option).data,
        })

    product.save()

    frozen_product=request.data.get("attributes")["frozenProduct"]["selected"]
    max_allowed_temperature=request.data.get("attributes")["frozenProduct"]["maxAllowedTemperature"] if frozen_product else None
    
    expiry_date_selectd=request.data.get("attributes")["expiryDate"]["selected"]
    expiry_date=request.data.get("attributes")["expiryDate"]["date"] if expiry_date_selectd else None

    inventory_feilds = {
        "regular_pricing":request.data.get("regularPrice"),
        "sale_pricing":request.data.get("salePrice"),
        "stock":request.data.get("restockQuantity"),
        "expiry_date":expiry_date,
        "fragile_product":request.data.get("attributes")["fragileProduct"],
        "biodegradable":request.data.get("attributes")["biodegradable"],
        "frozen_product":frozen_product,
        "max_allowed_temperature":max_allowed_temperature,
        "product":product.id,
    }
    if request.data.get("shoppingType") == "fulfilled_by_seller" or request.data.get("shoppingType") == "fulfilled_by_phoenix":
        print(request.data.get("shoppingType"))
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
        **ProductSerializer(product).data,
        "inventory":InventorySerializer(inventory).data,
        "variants":variants,
        "image":images,
        "organize":{
            **OrganizeSerializer(organize).data,
            "category":CategorySerializer(category).data,
            "collection":CollectionSerializer(collection).data,
            "vendor":VendorSerializer(vendor).data,
        },
        "inventory":{
            **InventorySerializer(inventory).data,
            "countries":countries,
        }
    }

    
    
    return Response(serialized_data, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrganize(request):
    print(">>>>>>>>>>>",request.data)
    name = request.data.get("name")
    value = {"name":request.data.get("label")}
    if name=="category":
        category_serializer = CategorySerializer(data=value)
        if category_serializer.is_valid():
            category = category_serializer.save()
            serialized_data = CategorySerializer(category).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(category_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
    elif name=="collection":
        collection_serializer = CollectionSerializer(data=value)
        if collection_serializer.is_valid():
            collection = collection_serializer.save()
            serialized_data = CollectionSerializer(collection).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(collection_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
    elif name=="vendor":
        vendor_serializer = VendorSerializer(data=value)
        if vendor_serializer.is_valid():
            vendor = vendor_serializer.save()
            serialized_data = VendorSerializer(vendor).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(vendor_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
    elif name=="tag":
        tag_serializer = TagSerializer(data=value)
        if tag_serializer.is_valid():
            tag = tag_serializer.save()
            serialized_data = TagSerializer(tag).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(tag_serializer.errers, status=status.HTTP_400_BAD_REQUEST)
    return Response({"error":"you have to spasify the name"}, status=status.HTTP_400_BAD_REQUEST)





