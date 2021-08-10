"""mbstockmonitor URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from stockmonitor import views

urlpatterns = [
	path('stockmonitor/', include('stockmonitor.urls')),
    path('admin/', admin.site.urls),
    path('', views.home),
    path('index/', views.get_index_data, name='indexes'),
    path('index_stock/', views.get_index_stock, name='indexes_stocks'),
    path('stock_diff/', views.get_stock_diff_view, name='stock_diff'),
    path('stock_trend/', views.get_stock_trend_view, name='trend'),
    path('stock_indicadores/', view.get_indicadores_stock_view, name='indicadores')
]
