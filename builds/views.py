from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
  template_name = 'index.html'
  template = loader.get_template('builds/templates/index.html')

  return HttpResponse(template)
