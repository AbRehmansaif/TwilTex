from django import forms
from .models import ContactInquiry

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactInquiry
        fields = ['first_name', 'last_name', 'email', 'country_code', 'phone', 'subject', 'message']
        widgets = {
            'subject': forms.Select(attrs={'class': 'form-select'}),
        }