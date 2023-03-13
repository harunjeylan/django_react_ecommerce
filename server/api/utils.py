from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Func

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class Round(Func):
    function = 'ROUND'
    template='%(function)s(%(expressions)s, 0)'

def getAverage(value, total):
    if total:
        return 0
    else:
        return value / total * 100