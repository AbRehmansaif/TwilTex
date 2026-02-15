from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Product

def products_list(request):
    """Products page with dynamic product cards and pagination"""
    products_list = Product.objects.filter(is_active=True).order_by('display_order', 'name')
    paginator = Paginator(products_list, 9) # Show 9 products per page

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, 'products.html', {'page_obj': page_obj})

def product_detail(request, slug):
    """Product detail page"""
    product = get_object_or_404(Product, slug=slug, is_active=True)
    return render(request, 'product_detail.html', {'product': product})
