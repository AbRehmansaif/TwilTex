from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from contacts.models import ContactInquiry

def home(request):
    """Home page view"""
    return render(request, 'index.html')

def about(request):
    """About page view"""
    return render(request, 'about.html')

@csrf_exempt
def contact(request):
    """Contact page view"""
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        country_code = request.POST.get('country_code', '+92')
        phone = request.POST.get('phone')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        # Clean inputs
        email = email.strip() if email else None
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
