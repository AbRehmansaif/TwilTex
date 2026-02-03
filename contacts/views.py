from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

from .forms import ContactForm

@require_POST
def contact_submit(request):
    data = json.loads(request.body)
    form = ContactForm(data)
    if form.is_valid():
        form.save()
        return JsonResponse({'success': True, 'message': 'Your message has been sent successfully!'})
    else:
        return JsonResponse({'success': False, 'errors': form.errors}, status=400)