# services/views.py
from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView
from services.models import Service

class ServiceListView(ListView):
    model = Service
    template_name = 'services/service_list.html'
    context_object_name = 'services'
    paginate_by = 10

class ServiceDetailView(DetailView):
    model = Service
    template_name = 'services/service_detail.html'
    context_object_name = 'service'

def all_services(request):
    services = Service.objects.all().order_by('-created_at')
    return render(request, 'services/all_services.html', {'services': services})