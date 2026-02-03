from django.shortcuts import render

def home(request):
    """Home page view"""
    return render(request, 'index.html')

def about(request):
    """About page view"""
    return render(request, 'about.html')

def contact(request):
    """Contact page view"""
    return render(request, 'contact.html')

def privacy(request):
    """Privacy policy page view"""
    return render(request, 'privacy.html')
