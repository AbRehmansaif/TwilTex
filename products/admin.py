from django.contrib import admin
from products.models import Product, ProductImage, Specification
from django.utils.html import format_html


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'is_main', 'caption', 'display_order')
    readonly_fields = ('image_preview',)
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'


class SpecificationInline(admin.TabularInline):
    model = Specification
    extra = 1
    fields = ('key', 'value', 'display_order')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'heading', 'is_active', 'display_order', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'heading', 'short_description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, SpecificationInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'heading', 'short_description', 'card_points')
        }),
        ('Detail Page Content', {
            'fields': ('detail_title', 'detail_description', 'detail_points')
        }),
        ('Specifications', {
            'fields': ('capacity', 'materials', 'applications')
        }),
        ('Display Settings', {
            'fields': ('is_active', 'display_order')
        }),
    )
    
    def get_formsets_with_inlines(self, request, obj=None):
        """Show specification inline only if not using JSON field"""
        for inline in self.get_inline_instances(request, obj):
            if isinstance(inline, SpecificationInline) and obj and obj.specifications:
                # Don't show specification inline if using JSON field
                continue
            yield inline.get_formset(request, obj), inline


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'is_main', 'display_order', 'image_preview')
    list_filter = ('is_main', 'product')
    search_fields = ('product__name', 'caption')
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Preview'