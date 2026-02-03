from django.contrib import admin
from .models import ContactInquiry

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'country_code', 'phone', 'subject', 'submitted_at', 'is_read')
    list_filter = ('is_read', 'submitted_at', 'subject')
    search_fields = ('first_name', 'last_name', 'email', 'phone', 'message')
    readonly_fields = ('submitted_at',)
    list_editable = ('is_read',)
    list_per_page = 20
    
    fieldsets = (
        ('Personal Information', {
            'fields': (('first_name', 'last_name'), ('email', 'country_code', 'phone'))
        }),
        ('Inquiry Details', {
            'fields': ('subject', 'message', 'submitted_at', 'is_read')
        }),
    )
