from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from django.views import generic

# Create your views here.

from django.http import HttpResponse

class LandingView(generic.ListView):
   template_name = "Youtube_app/landing-page.html"
   context_object_name = "latest_youtube_videos_list"

def landing(request):
    return render(request, "Youtube_app/landing-page.html", {})