from rest_framework.response import Response
from rest_framework import status
def admin_only(func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_superuser:
          return func(request, *args, **kwargs)
        else:
          return Response({"details":"Unauthorize!"}, status = status.HTTP_400_BAD_REQUEST)
    return wrapper

