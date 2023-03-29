from django.db.models import Func


class Round(Func):
    function = 'ROUND'
    template='%(function)s(%(expressions)s, 0)'

def getAverage(value, total):
    return 0 if total == 0 else value / total * 100
