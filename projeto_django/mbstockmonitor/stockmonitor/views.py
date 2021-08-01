from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
import json
import yfinance as yf
from datetime import date, timedelta
from stockmonitor.sm_functions import *
# Create your views here.

def get_stock_data(request):

	ticker = 'VALE3'
	yday = date.today() - timedelta(1)
	last_day = last_day_bd_acao(ticker)

	if last_day != yday:
		atualiza_acao_banco(last_day + timedelta(1), ticker)

	dados_historicos = get_dados_historicos_acao(ticker)
	intraday = get_intraday_acao(ticker)

	acao = {'Dados do dia': intraday,'Dados Historicos': dados_historicos}

	return HttpResponse(json.dumps(acao))

def get_index_data(request):

	cod_index = 'Ibovespa'
	yday = date.today() - timedelta(1)
	last_day = last_day_bd_index(cod_index)

	if last_day != yday:
		atualiza_index_banco(last_day + timedelta(1), cod_index)

	dados_historicos = get_dados_historicos_index(cod_index)
	intraday = get_intraday_index(cod_index)

	index = {'Dados do dia': intraday,'Dados Historicos': dados_historicos}

	return HttpResponse(json.dumps(index))	        