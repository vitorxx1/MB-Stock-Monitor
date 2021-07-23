from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
import json
import yfinance as yf
from datetime import date
# Create your views here.

def home(request):

	dale = ['PETR4']
	with connection.cursor() as cursor:
		cursor.execute("select * from cotacao where aco_codigo = %s",dale)
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
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    
    return [dict(zip(columns, row)) for row in cursor.fetchall()]