from django.db import models
from django.utils.translation import gettext_lazy as _

class ContactInquiry(models.Model):
    SUBJECT_CHOICES = [
        ('General Inquiry', 'General Inquiry'),
        ('Sales & Quotes', 'Sales & Quotes'),
        ('Support', 'Support'),
        ('Careers', 'Careers'),
    ]

    first_name = models.CharField(_('First Name'), max_length=100)
    last_name = models.CharField(_('Last Name'), max_length=100, blank=True, null=True)
    email = models.EmailField(_('Email Address'), blank=True, null=True)
    country_code = models.CharField(_('Country Code'), max_length=10, default='+92')
    phone = models.CharField(_('Mobile Number'), max_length=20, blank=True, null=True)
    subject = models.CharField(_('Subject'), max_length=100, choices=SUBJECT_CHOICES, default='General Inquiry')
    message = models.TextField(_('Message'))
    submitted_at = models.DateTimeField(_('Submitted At'), auto_now_add=True)
    is_read = models.BooleanField(_('Is Read'), default=False)

    class Meta:
        verbose_name = _('Contact Inquiry')
        verbose_name_plural = _('Contact Inquiries')
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name if self.last_name else ''} - {self.subject}"