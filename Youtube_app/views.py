from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404


# Create your views here.

from django.http import HttpResponse

def landing(request):
    return render(request, "Youtube_app/landing-page.html", {})