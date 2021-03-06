from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
import json
import yfinance as yf
from datetime import date, timedelta
from stockmonitor.sm_functions import *
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@csrf_exempt
def home(request):
	return render(request,'index.html',{})

@csrf_exempt
def get_stock_data(request):

	ticker = request.POST.get('ticker')
	yday = date.today() - timedelta(1)
	last_day = last_day_bd_acao(ticker)

	if last_day != yday:
		atualiza_acao_banco(last_day + timedelta(1), ticker)

	indicadores = get_indicadores_stock(ticker)
	previsao = previsao_acao(ticker)
	intraday = get_intraday_acao(ticker)
	dados_historicos = get_dados_historicos_acao(ticker)

	acao = {'Indicadores': indicadores,'Previsao': previsao,'Dados do dia': intraday,'Dados Historicos': dados_historicos}

	return HttpResponse(json.dumps(acao), content_type='application/json')

@csrf_exempt
def get_index_data(request):

	cod_index = request.POST.get('ticker', 'null')
	yday = date.today() - timedelta(1)
	last_day = last_day_bd_index(cod_index)

	if last_day != yday and last_day != 0:
		atualiza_index_banco(last_day + timedelta(1), cod_index)

	dados_historicos = get_dados_historicos_index(cod_index)
	intraday = get_intraday_index(cod_index)
	top_stock = get_top_index_stock(cod_index)

	index = {'Dados do dia': intraday,'Dados Historicos': dados_historicos, 'Top 10 Acoes': top_stock}

	return HttpResponse(json.dumps(index), content_type='application/json')

def get_index_stock(request):

	index_stock = get_stock_by_index()

	return HttpResponse(json.dumps(index_stock), content_type='application/json')

@csrf_exempt
def get_stock_diff_view(request):

	ticker = request.POST.get('ticker', 'null')

	stock_diff = get_stock_diff(ticker)

	return HttpResponse(json.dumps(stock_diff), content_type='application/json')