import time
from django.shortcuts import render, redirect
from django.contrib import messages
from django.utils.html import strip_tags
from contacts.models import ContactInquiry
from products.models import Product
from services.models import Service

def home(request):
    """Home page view"""
    products = Product.objects.filter(is_active=True).order_by('display_order')[:6]
    services = Service.objects.all().order_by('-created_at')[:4]
    return render(request, 'index.html', {
        'products': products,
        'services': services
    })

def about(request):
    """About page view"""
    return render(request, 'about.html')

def contact(request):
    """Contact page view"""
    if request.method == 'POST':
        # 1. Spam Protection: Honeypot Check
        if request.POST.get('website_url'):
            # Silent discard for bots
            messages.success(request, "Your message has been sent successfully!")
            return redirect('main:contact')
            
        # 2. Spam Protection: Rate Limiting
        current_time = time.time()
        last_contact_time = request.session.get('last_contact_time', 0)
        if current_time - last_contact_time < 30:  # 30 seconds cooldown
            messages.error(request, "Please wait a moment before sending another message.")
            return redirect('main:contact')
        
        request.session['last_contact_time'] = current_time

        # 3. Security: Sanitize and Limit Payload Size
        first_name = strip_tags(request.POST.get('first_name', ''))[:100].strip()
        last_name = strip_tags(request.POST.get('last_name', ''))[:100].strip()
        email = request.POST.get('email', '').strip()[:254]
        country_code = strip_tags(request.POST.get('country_code', '+92'))[:10].strip()
        phone = strip_tags(request.POST.get('phone', ''))[:20].strip()
        subject = strip_tags(request.POST.get('subject', ''))[:150].strip()
        message = strip_tags(request.POST.get('message', ''))[:2000].strip()

        # Clean inputs
        email = email if email else None
        phone = phone.strip() if phone else None

        # Validation: Either email or phone is required
        if not email and not phone:
            messages.error(request, "Please provide either your Email Address or Mobile Number.")
            return render(request, 'contact.html', {
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'phone': phone,
                'subject': subject,
                'message': message,
            })

        try:
            ContactInquiry.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                country_code=country_code,
                phone=phone,
                subject=subject,
                message=message
            )
            messages.success(request, "Your message has been sent successfully!")
            return redirect('main:contact')
        except Exception as e:
            messages.error(request, f"An error occurred: {str(e)}")
            
    return render(request, 'contact.html')

def privacy(request):
    """Privacy policy page view"""
    return render(request, 'privacy.html')
