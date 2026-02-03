from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView
from .models import Product

def products_list(request):
    """Products page with dynamic product cards"""
    products = Product.objects.filter(is_active=True)
    return render(request, 'products.html', {'products': products})

def product_detail(request, slug):
    """Product detail page"""
    product = get_object_or_404(Product, slug=slug, is_active=True)
    return render(request, 'product_detail.html', {'product': product})
