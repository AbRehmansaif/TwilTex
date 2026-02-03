# services/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.ServiceListView.as_view(), name='service_list'),
    path('all/', views.all_services, name='all_services'),
    path('<int:pk>/', views.ServiceDetailView.as_view(), name='service_detail'),
]