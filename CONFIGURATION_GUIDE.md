# Backend-Frontend Configuration Guide

## Overview
This document explains how the Django backend is configured to work with your frontend templates.

## Project Structure

```
TwilTex/
├── templates/              # All HTML templates
│   ├── base.html          # Base template (not currently used as parent)
│   ├── index.html         # Home page
│   ├── about.html         # About page
│   ├── contact.html       # Contact page
│   ├── privacy.html       # Privacy policy page
│   ├── products.html      # Products listing (dynamic)
│   ├── product_detail.html # Product detail page (dynamic)
│   ├── services.html      # Services listing (dynamic)
│   └── service_detail.html # Service detail page (dynamic)
├── static/                # Static files
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── media/                 # User-uploaded files (products, services images)
├── main/                  # Main app for static pages
├── products/              # Products app
├── services/              # Services app
└── twiltex/              # Project settings
```

## URL Configuration

### Main URLs (`twiltex/urls.py`)
Following Django best practices, URLs are organized by app:

```python
urlpatterns = [
    path('admin/', admin.site.urls),           # Admin panel
    path('', include('main.urls')),            # Home, About, Contact, Privacy
    path('products/', include('products.urls')), # Products pages
    path('services/', include('services.urls')), # Services pages
]
```

### URL Patterns

| URL Pattern | View | Template | Description |
|------------|------|----------|-------------|
| `/` | `main.views.home` | `index.html` | Home page |
| `/about/` | `main.views.about` | `about.html` | About page |
| `/contact/` | `main.views.contact` | `contact.html` | Contact page |
| `/privacy/` | `main.views.privacy` | `privacy.html` | Privacy policy |
| `/products/` | `products.views.products_list` | `products.html` | Products listing |
| `/products/<slug>/` | `products.views.product_detail` | `product_detail.html` | Product detail |
| `/services/` | `services.views.services_list` | `services.html` | Services listing |
| `/services/<id>/` | `services.views.service_detail` | `service_detail.html` | Service detail |

## Django Template Tags Used

### Static Files
All CSS, JS, and image references use Django's static file system:

```django
{% load static %}
<link rel="stylesheet" href="{% static 'css/style.css' %}">
<script src="{% static 'js/main.js' %}"></script>
```

### URL Reversing
All links use Django's URL reversing for maintainability:

```django
<a href="{% url 'main:home' %}">Home</a>
<a href="{% url 'products:list' %}">Products</a>
<a href="{% url 'services:detail' service.pk %}">View Service</a>
```

## Dynamic Content

### Products Page (`products.html`)
- **Static Fallback**: Shows 3 hardcoded products if database is empty
- **Dynamic**: Loops through `products` from database when available
- **Template Variables**:
  - `products` - QuerySet of Product objects
  - `product.name` - Product name
  - `product.short_description` - Brief description
  - `product.get_card_points_list()` - List of bullet points
  - `product.images.first.image.url` - Main product image
  - `product.slug` - URL-friendly identifier

### Services Page (`services.html`)
- **Static Fallback**: Shows 3 hardcoded services if database is empty
- **Dynamic**: Loops through `services` from database when available
- **Template Variables**:
  - `services` - QuerySet of Service objects
  - `service.title` - Service title
  - `service.description` - Service description
  - `service.image.url` - Service image
  - `service.pk` - Primary key for detail URL

### Product Detail Page (`product_detail.html`)
Shows comprehensive product information:
- Product images
- Detailed description
- Key features (bullet points)
- Capacity information
- Materials (as badges)
- Applications (as badges)
- Specifications (if available)

### Service Detail Page (`service_detail.html`)
Shows service information:
- Service image
- Full description
- Call-to-action buttons

## Settings Configuration

### Templates (`settings.py`)
```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Global templates directory
        'APP_DIRS': True,  # Also look in app-specific template folders
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.messages',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
            ],
        },
    },
]
```

### Static Files
```python
STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'static']  # Development static files
```

### Media Files
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'  # User-uploaded files
```

## Database Models

### Product Model
```python
class Product(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    heading = models.CharField(max_length=300)
    short_description = models.TextField()
    card_points = models.TextField()  # Comma-separated
    detail_title = models.CharField(max_length=300, blank=True)
    detail_description = models.TextField()
    detail_points = models.TextField()  # Comma-separated
    capacity = models.CharField(max_length=100, blank=True)
    materials = models.TextField()  # Comma-separated
    applications = models.TextField()  # Comma-separated
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
```

### Service Model
```python
class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='services/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

## How to Add Content

### Adding Products
1. Go to Django Admin: `http://localhost:8000/admin/`
2. Navigate to Products → Add Product
3. Fill in all required fields
4. Upload product images via ProductImage model
5. Save and view on products page

### Adding Services
1. Go to Django Admin: `http://localhost:8000/admin/`
2. Navigate to Services → Add Service
3. Fill in title, description, and upload image
4. Save and view on services page

## Running the Application

### Development Server
```bash
python manage.py runserver
```

### Apply Migrations (if needed)
```bash
python manage.py makemigrations
python manage.py migrate
```

### Create Superuser (for admin access)
```bash
python manage.py createsuperuser
```

## Best Practices Implemented

1. **URL Namespacing**: Each app has its own namespace (`main:`, `products:`, `services:`)
2. **Static File Management**: Using Django's static file system for easy deployment
3. **Media File Handling**: Separate media directory for user uploads
4. **Template Organization**: Templates in project root for easy access
5. **Fallback Content**: Static content shown when database is empty
6. **SEO-Friendly URLs**: Using slugs for products, clean URL patterns
7. **Responsive Design**: All templates maintain mobile-first approach
8. **DRY Principle**: Reusable components and consistent structure

## Next Steps

1. **Update remaining templates**: Convert `index.html`, `about.html`, `contact.html`, `privacy.html` to use Django template tags
2. **Add contact form functionality**: Implement form handling in contact page
3. **Add pagination**: For products and services if you have many items
4. **Add search functionality**: Allow users to search products/services
5. **Add filtering**: Filter products by material, application, etc.
6. **Optimize images**: Add image optimization for better performance
7. **Add caching**: Implement Django caching for better performance
8. **Add tests**: Write unit tests for views and models

## Troubleshooting

### Static files not loading
- Run: `python manage.py collectstatic` (for production)
- Check `STATIC_URL` and `STATICFILES_DIRS` in settings
- Ensure `{% load static %}` is at the top of templates

### Media files not showing
- Check `MEDIA_URL` and `MEDIA_ROOT` in settings
- Ensure media URLs are configured in `urls.py` (for development)
- Verify file permissions on media directory

### Template not found
- Check template path in `TEMPLATES['DIRS']`
- Ensure template file exists in correct location
- Check for typos in template name

### URL not resolving
- Check URL pattern in `urls.py`
- Verify app namespace is correct
- Use `{% url 'app:name' %}` format consistently
