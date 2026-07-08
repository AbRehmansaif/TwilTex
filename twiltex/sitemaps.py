from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from blogs.models import BlogPost

class StaticViewSitemap(Sitemap):
    priority = 0.8
    changefreq = 'weekly'

    def items(self):
        return [
            'main:home',
            'main:about',
            'main:contact',
            'main:privacy',
            'products:list',
            'services:list',
            'blogs:blog_list',
        ]

    def location(self, item):
        return reverse(item)

class BlogSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.9

    def items(self):
        return BlogPost.objects.filter(status='published')

    def lastmod(self, obj):
        return obj.updated_at
