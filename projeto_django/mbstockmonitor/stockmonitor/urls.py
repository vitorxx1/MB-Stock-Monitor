from django.urls import path

from . import views

app_name = 'stockmonitor'
urlpatterns = [
    path('', views.get_stock_data, name='stocks'),
    path('index/', views.get_index_data, name='indexes'),
]