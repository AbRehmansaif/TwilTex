from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Blog

def blog_list(request):
    blogs_list = Blog.objects.all()
    paginator = Paginator(blogs_list, 10) # Show 10 blogs per page.

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'blogs/blog_list.html', {'page_obj': page_obj})

def blog_detail(request, pk):
    blog = get_object_or_404(Blog, pk=pk)
    return render(request, 'blogs/blog_detail.html', {'blog': blog})
