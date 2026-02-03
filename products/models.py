from django.db import models
from django.utils.text import slugify

class Product(models.Model):
    # Main product information
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    short_description = models.TextField(help_text="Brief description shown on product card")
    
    # Points for product card (comma separated, will be split)
    card_points = models.TextField(help_text="Enter points separated by commas")
    
    # View Details Page Content
    detail_description = models.TextField(help_text="Main paragraph with product details")
    
    # Bullet points for detail page (comma separated)
    detail_points = models.TextField(help_text="Enter bullet points separated by commas")
    
    # Applications
    applications = models.TextField(help_text="Comma separated list of applications")
    
    # Active status
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0, help_text="Order in which products appear")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def get_card_points_list(self):
        """Convert comma-separated points to list"""
        return [point.strip() for point in self.card_points.split(',') if point.strip()]
    
    def get_detail_points_list(self):
        """Convert comma-separated detail points to list"""
        return [point.strip() for point in self.detail_points.split(',') if point.strip()]
    
    def get_applications_list(self):
        """Convert comma-separated applications to list"""
        return [app.strip() for app in self.applications.split(',') if app.strip()]
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['display_order', 'name']


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/')
    is_main = models.BooleanField(default=False, help_text="Main product image")
    caption = models.CharField(max_length=200, blank=True)
    display_order = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.product.name} - Image {self.display_order}"
    
    class Meta:
        ordering = ['is_main', 'display_order']
