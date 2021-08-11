from django.db import connection
import json
import yfinance as yf
import os
from datetime import date, timedelta

def dict_return(cursor):
    #Retorna uma de dicionários da consulta do cursor
    columns = [col[0] for col in cursor.description]
    
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

def last_day_bd_acao(ticker):

	with connection.cursor() as cursor:
		cursor.execute('select max(cot_data) from cotacao where aco_codigo = %s',[ticker])
		data = cursor.fetchone()[0]

	if data == None:
		return 0;

	return data;

def atualiza_acao_banco(start, ticker):

	df_acao = yf.download('{}.SA'.format(ticker),start=str(start), end=date.today())    
	#removendo coluna Adj Close e removendo linhas com Na values
	df_acao = df_acao.drop(columns=['Adj Close'])
	df_acao = df_acao.dropna()
	#tratando possíveis valores errados de cotação
	columns = list(df_acao.columns)
	columns.pop()
	for column in columns:
		   df_acao.loc[df_acao[column] > 9999, column] = df_acao.loc[df_acao[column] > 9999, column]/1000
	#orient indica quais são os valores de orientação do dicionário
	#nesse caso, as chaves do dicionário são os valores dos índices dos elementos do DF
	dict_acao = df_acao.to_dict(orient='index')
		        
	with connection.cursor() as cursor:
		for key in dict_acao:
			if (key.date() >= start):
				cursor.execute("insert into cotacao values (%s,%s,%s,%s,%s,%s,%s)",[key.date(),ticker,
																				    dict_acao[key]['Open'],
																				    dict_acao[key]['High'],
																				    dict_acao[key]['Low'],
																				    dict_acao[key]['Close'],
																				    dict_acao[key]['Volume']])

def get_dados_historicos_acao(ticker):

	with connection.cursor() as cursor:
		cursor.execute("select cot_data, cot_fechamento from cotacao where aco_codigo = %s",[ticker])
		query = dict_return(cursor)

	dados_historicos = {}
	for reg in query:
		data = str(reg["cot_data"])
		dados_historicos[data] = {}
		dados_historicos[data]["Close"] = str(reg["cot_fechamento"])

	return dados_historicos

def get_intraday_acao(ticker):

	today = date.today()
	df_acao = yf.download('{}.SA'.format(ticker),start=today,interval='5m')
	#Caso o DataFrame esteja vazio, não há dados diários e pega os últimos disponíveis
	if len(df_acao) == 0:
		df_acao = yf.download('{}.SA'.format(ticker),start=last_day_bd_acao(ticker),interval='5m')
	
	df_acao = df_acao.drop(columns=['Adj Close'])
	dict_acao = df_acao.to_dict(orient='index')
		        
	intraday = {}
	for key in dict_acao:
	    intraday[f"{key.date()} {key.time()}"] = {}
	    intraday[f"{key.date()} {key.time()}"]["Open"] = str(round(dict_acao[key]["Open"],2))
	    intraday[f"{key.date()} {key.time()}"]["High"] = str(round(dict_acao[key]["High"],2))
	    intraday[f"{key.date()} {key.time()}"]["Low"] = str(round(dict_acao[key]["Low"],2))
	    intraday[f"{key.date()} {key.time()}"]["Close"] = str(round(dict_acao[key]["Close"],2))
	    intraday[f"{key.date()} {key.time()}"]["Volume"] = str(dict_acao[key]["Volume"])

	return intraday

def last_day_bd_index(cod_index):

	with connection.cursor() as cursor:
		cursor.execute('select max(cot_ind_data) from cotacao_indice where ind_sigla = %s',[cod_index])
		data = cursor.fetchone()[0]

	if data == None:
		return 0;

	return data;

def atualiza_index_banco(start, cod_index):

	#pegando codigo do yf do indice
	with connection.cursor() as cursor:
		cursor.execute("select ind_codigo_yf from indice where ind_sigla = %s",[cod_index])
		cod_index_yf = cursor.fetchone()[0]

	
	df_index = yf.download(cod_index_yf,start=str(start), end=date.today())	    
	#removendo coluna Adj Close, Volume e removendo linhas com Na values
    
	df_index = df_index.drop(columns=['Adj Close','Volume'])
	df_index = df_index.dropna()
	#orient indica quais são os valores de orientação do dicionário
	#nesse caso, as chaves do dicionário são os valores dos índices dos elementos do DF
	dict_index = df_index.to_dict(orient='index')
		        
	with connection.cursor() as cursor:
		for key in dict_index:
			if (key.date() >= start):
				cursor.execute("insert into cotacao_indice values (%s,%s,%s,%s,%s,%s)",[key.date(),cod_index,
																				    dict_index[key]['Open'],
																				    dict_index[key]['High'],
																				    dict_index[key]['Low'],
																				    dict_index[key]['Close']])

def get_dados_historicos_index(cod_index):

	with connection.cursor() as cursor:
		cursor.execute("select cot_ind_data, cot_ind_fechamento from cotacao_indice where ind_sigla = %s",[cod_index])
		query = dict_return(cursor)

	dados_historicos = {}
	
	if query != None:
		for reg in query:
			data = str(reg["cot_ind_data"])
			dados_historicos[data] = {}
			dados_historicos[data]["Close"] = str(reg["cot_ind_fechamento"])

	return dados_historicos

def get_intraday_index(cod_index):

	#pegando codigo do yf do indice
	with connection.cursor() as cursor:
		cursor.execute("select ind_codigo_yf from indice where ind_sigla = %s",[cod_index])
		cod_index_yf = cursor.fetchone()[0]

	today = date.today()
	df_index = yf.download(tickers=cod_index_yf,start=today,interval='5m')
	#Caso o DataFrame esteja vazio, não há dados diários e pega os últimos disponíveis
	if last_day_bd_index(cod_index) == 0 and len(df_index) == 0:
		df_index = yf.download(cod_index_yf,start=today-timedelta(1),end=today,interval='5m')

	if len(df_index) == 0:
		df_index = yf.download(cod_index_yf,start=last_day_bd_index(cod_index),interval='5m')
	df_index = df_index.drop(columns=['Adj Close','Volume'])
	dict_index = df_index.to_dict(orient='index')
	intraday = {}
	for key in dict_index:
	    intraday[f"{key.date()} {key.time()}"] = {}
	    intraday[f"{key.date()} {key.time()}"]["Open"] = str(round(dict_index[key]["Open"],2))
	    intraday[f"{key.date()} {key.time()}"]["High"] = str(round(dict_index[key]["High"],2))
	    intraday[f"{key.date()} {key.time()}"]["Low"] = str(round(dict_index[key]["Low"],2))
	    intraday[f"{key.date()} {key.time()}"]["Close"] = str(round(dict_index[key]["Close"],2))

	return intraday

def get_stock_by_index():

	with connection.cursor() as cursor:
		cursor.execute("select ind_sigla from indice")
		indexes_names = cursor.fetchall()

	index_stock = {}

	with connection.cursor() as cursor:
		for index in indexes_names:
			cursor.execute("select aco_codigo from listagem where ind_sigla = %s",[index[0]])
			stock_names = cursor.fetchall()

			stock_names_array = []
			for stock in stock_names:
				stock_names_array.append(stock[0])

			index_stock[index[0]] = stock_names_array

	return index_stock

def get_stock_diff(ticker):

	today = date.today()
	yday = date.today() - timedelta(1)
	last_day = last_day_bd_acao(ticker)

	if last_day != yday:
		atualiza_acao_banco(last_day + timedelta(1), ticker)

	df_acao = yf.download('{}.SA'.format(ticker),start=today)
	#Caso o DataFrame esteja vazio ou a data não seja a do dia atual
	if len(df_acao) == 0 or df_acao.index.date[0] != date.today():
		df_acao = yf.download('{}.SA'.format(ticker),start=last_day_bd_acao(ticker))
		with connection.cursor() as cursor:
			cursor.execute("select max(cot_data) from cotacao where aco_codigo = %s"+
			 				"and cot_data not in(select max(cot_data) from cotacao where aco_codigo = %s)",[ticker,ticker])
			data = cursor.fetchone()[0]

		with connection.cursor() as cursor:
			cursor.execute("select cot_fechamento from cotacao where aco_codigo = %s and cot_data = %s",[ticker, data])
			last_close = cursor.fetchone()
	else:
		data = last_day_bd_acao(ticker)
		with connection.cursor() as cursor:
			cursor.execute("select cot_fechamento from cotacao where aco_codigo = %s and cot_data = %s",[ticker, data])
			last_close = cursor.fetchone()

	dados = {}
	perc = ((float(df_acao.iloc[:,3].values[0])/float(last_close[0]))-1)*100
	dados["percent"] = perc
	dados["preco"] = str(df_acao.iloc[:,3].values[0])

	return dados

def get_indicadores_stock(ticker):
	
	df = yf.Ticker('{}.SA'.format(ticker))

	indicadores = {}

	with connection.cursor() as cursor:
		cursor.execute("select emp_nome from empresa where emp_codigo = (select emp_codigo from acao where aco_codigo = %s", [ticker])
		empresa = cursor.fetchone()[0]

	indicadores["Nome"] = empresa
	indicadores["LPA"] = str(round(df.info["trailingEps"],2))
	indicadores["Alta 52"] = str(round(df.info["fiftyTwoWeekHigh"],2))
	indicadores["Baixa 52"] = str(round(df.info["fiftyTwoWeekLow"],2))
	indicadores["Ult Dividendo"] = str(round(df.info["lastDividendValue"],2))
	indicadores["Prox Dividendo"] = str(round(df.info["dividendRate"],2))

	return indicadores
