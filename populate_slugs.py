import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'twiltex.settings')
django.setup()

from services.models import Service

def populate():
    services = Service.objects.filter(slug__isnull=True)
    count = 0
    for service in services:
        service.save()  # The save method will auto-generate the slug
        count += 1
    print(f"Successfully generated slugs for {count} services.")

if __name__ == '__main__':
    populate()
