from django.contrib import admin
from products.models import Product, ProductImage
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


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'display_order', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'short_description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'short_description', 'card_points')
        }),
        ('Detail Page Content', {
            'fields': ('detail_description', 'detail_points')
        }),
        ('Additional Info', {
            'fields': ('applications',)
        }),
        ('Display Settings', {
            'fields': ('is_active', 'display_order')
        }),
    )


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
