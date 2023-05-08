from rest_framework_simplejwt.tokens import RefreshToken
from account.models import Address,Profile
from account.serializer import AddressSerializer, ProfileSerializer, UserSerializer

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
def get_user_data(request, user):
    address, is_address_created = Address.objects.get_or_create(user=user)
    profile, is_profile_created = Profile.objects.get_or_create(user=user)
    customer_data = {
        **ProfileSerializer(profile, context={"request": request}).data,
        **AddressSerializer(address).data,
        **UserSerializer(user).data,
        "full_name":user.get_full_name(),
    }
    return customer_data

def get_user_list_data(request, users):
    users_data = []
    for user in users:
        users_data.append(get_user_data(request, user))
    return users_data