from rest_framework import serializers
from django.contrib.auth.models import  User
import django.contrib.auth.password_validation as validators
from account.models import Address, Profile
#===========================================================================
class RegistrationSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['first_name','last_name','username', 'password']

#===========================================================================
class PassChangeFormSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password1 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['old_password','password1']

#===========================================================================
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("__all__")

#===========================================================================
class UpdateProfileFormSerializer(serializers.ModelSerializer):
    # phone_number = serializers.CharField()
    class Meta:
        model = Profile
        fields = ["phone_number"]


#===========================================================================
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["country","street1","street2","city","zipcode","state"]





#===========================================================================
class UpdateAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["country","street1","street2","city","zipcode","state"]


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id', 'username', 'first_name', 'last_name', 'email', 'is_superuser'
        )
        extra_kwargs = {
            'username': {'read_only': True},
            'email': {'read_only': True},
            'is_superuser': {'read_only': True}
        }
    # def __init__(self,user, *args, **kwargs):
    #     profile = Profile.objects.get(user=user)
    #     serializer = ProfileSerializer(profile)
    #     self.fields["profile"] = serializer.data
    #     super().__init__(*args, **kwargs)
   