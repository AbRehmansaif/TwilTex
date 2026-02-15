from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.db.models import Prefetch
from .models import Product
from services.models import Service

def products_list(request):
    """Products page with services-categorized items, search, and a full product catalog"""
    query = request.GET.get('q')
    active_products = Product.objects.filter(is_active=True).order_by('display_order', 'name')
    
    if query:
        active_products = active_products.filter(name__icontains=query)

    # Fetch services with only active (and potentially searched) related products prefetched
    services = Service.objects.prefetch_related(
        Prefetch('products', queryset=active_products)
    ).all()
    
    # Paginate the general catalog
    paginator = Paginator(active_products, 9)

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'services': services,
        'page_obj': page_obj,
        'search_query': query,
    }
    return render(request, 'products.html', context)

def product_detail(request, slug):
    """Product detail page"""
    product = get_object_or_404(Product, slug=slug, is_active=True)
    return render(request, 'product_detail.html', {'product': product})
