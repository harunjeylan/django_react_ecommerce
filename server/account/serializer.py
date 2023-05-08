from rest_framework import serializers
from django.contrib.auth.models import User
import django.contrib.auth.password_validation as validators
from account.models import Address, Profile, CustomerNote
# ===========================================================================


class RegistrationSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

# ===========================================================================


class PassChangeFormSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(
        required=True, style={'input_type': 'password'}, write_only=True)
    new_password = serializers.CharField(
        required=True, style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['old_password', 'new_password']
        extra_kwargs = {
            'old_password': {'write_only': True},
            'new_password': {'write_only': True},
        }

# ===========================================================================
class ProfileImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Profile
        fields = ["image"]

class ProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Profile
        fields = ("__all__")

# ===========================================================================


class UpdateProfileFormSerializer(serializers.ModelSerializer):
    # phone_number = serializers.CharField()

    class Meta:
        model = Profile
        fields = ["phone_number",]

# ===========================================================================


class UpdateUserFormSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(allow_blank=True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name',"username","email"]

# ===========================================================================


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["country", "street1", "street2", "city", "zipcode", "state"]


# ===========================================================================
class UpdateAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["country", "street1", "street2", "city", "zipcode", "state"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name',
                  'email', 'is_superuser', 'date_joined']

    # def __init__(self,user, *args, **kwargs):
    #     profile = Profile.objects.get(user=user)
    #     serializer = ProfileSerializer(profile)
    #     self.fields["profile"] = serializer.data
    #     super().__init__(*args, **kwargs)


class CustomerNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerNote
        fields = ("__all__")
