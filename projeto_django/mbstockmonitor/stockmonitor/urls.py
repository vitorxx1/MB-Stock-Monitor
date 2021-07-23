from django.urls import path

from . import views

app_name = 'stockmonitor'
urlpatterns = [
    path('', views.home, name='home'),
]