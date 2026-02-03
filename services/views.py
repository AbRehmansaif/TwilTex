from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView
from .models import Service

def services_list(request):
    """Services page with dynamic service cards"""
    services = Service.objects.all()
    return render(request, 'services.html', {'services': services})

def service_detail(request, pk):
    """Service detail page"""
    service = get_object_or_404(Service, pk=pk)
    return render(request, 'service_detail.html', {'service': service})