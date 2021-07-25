from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
import json
import yfinance as yf
from datetime import date, timedelta
# Create your views here.

def home(request):

	ticker = 'PETR4'
	last_day = last_day_bd(ticker)

	if last_day == date.today():
		return HttpResponse('Chama no bresque')
	else:
		get_hist_data(last_day + timedelta(1), ticker)

	with connection.cursor() as cursor:
		cursor.execute("select * from cotacao where aco_codigo = %s",[ticker])
		query = dict_return(cursor)

	dados_historicos = {}
	for reg in query:
		data = str(reg["cot_data"])
		dados_historicos[data] = {}
		dados_historicos[data]["Open"] = str(reg["cot_abertura"])
		dados_historicos[data]["High"] = str(reg["cot_max"])
		dados_historicos[data]["Low"] = str(reg["cot_min"])
		dados_historicos[data]["Close"] = str(reg["cot_fechamento"])
		dados_historicos[data]["Volume"] = str(reg["cot_volume"])

	today = date.today()
	df = yf.download('VALE3.SA',start=today,interval='5m')
	df = df.drop(columns=['Adj Close'])
	dict_acao = df.to_dict(orient='index')

	intraday = {}
	for key in dict_acao:
	    intraday[f"{key.date()} {key.time()}"] = {}
	    intraday[f"{key.date()} {key.time()}"]["Open"] = str(round(dict_acao[key]["Open"],2))
	    intraday[f"{key.date()} {key.time()}"]["High"] = str(round(dict_acao[key]["High"],2))
	    intraday[f"{key.date()} {key.time()}"]["Low"] = str(round(dict_acao[key]["Low"],2))
	    intraday[f"{key.date()} {key.time()}"]["Close"] = str(round(dict_acao[key]["Close"],2))
	    intraday[f"{key.date()} {key.time()}"]["Volume"] = str(dict_acao[key]["Volume"])

	acoes = {'Dados do dia': intraday,'Dados Historicos': dados_historicos}

	return HttpResponse(json.dumps(acoes))

def dict_return(cursor):
    #Return all rows from a cursor as a dict
    columns = [col[0] for col in cursor.description]
    
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

def last_day_bd(ticker):

	with connection.cursor() as cursor:
		cursor.execute('select max(cot_data) from cotacao where aco_codigo = %s',[ticker])
		data = cursor.fetchone()

	return data[0];

def get_hist_data(start, ticker):

	try:
		   df = yf.download('{}.SA'.format(ticker),start=str(start))
	except:
		print(f'Falhou para {ticker}')
		    
	#removendo coluna Adj Close e removendo linhas com Na values
	df = df.drop(columns=['Adj Close'])
	df = df.dropna()
	#tratando possíveis valores errados de cotação
	columns = list(df.columns)
	columns.pop()
	for column in columns:
		   df.loc[df[column] > 9999, column] = df.loc[df[column] > 9999, column]/1000
	#orient indica quais são os valores de orientação do dicionário
	#nesse caso, as chaves do dicionário são os valores dos índices dos elementos do DF
	dict_acao = df.to_dict(orient='index')
		        
	with connection.cursor() as cursor:
		for key in dict_acao:
			if (key.date() >= start):
				cursor.execute("insert into cotacao values (%s,%s,%s,%s,%s,%s,%s)",[key.date(),ticker,
																				          dict_acao[key]['Open'],
																				          dict_acao[key]['High'],
																				          dict_acao[key]['Low'],
																				          dict_acao[key]['Close'],
																				          dict_acao[key]['Volume']])
		        
		        