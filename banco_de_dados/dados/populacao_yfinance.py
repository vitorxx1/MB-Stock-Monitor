import yfinance as yf
import pandas as pd
import mysql.connector
from datetime import date, timedelta
#%%dados de conexão com o banco
connection = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "VitAum2tres4.",
    database = "mb_stock_monitor"
)

#alimentando o banco com dados históricos das ações
with connection.cursor() as cursor:
    cursor.execute("select aco_codigo from acao")
    tickers = [acao[0] for acao in cursor.fetchall()]

today = date.today()
cursor = connection.cursor()
for ticker in tickers:
    try:
        df = yf.download('{}.SA'.format(ticker),start='2009-01-01',end=today)
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
        
    dados = []
    tup = ()
    for key in dict_acao:
        tup = (key.date(),
               ticker,
               dict_acao[key]['Open'],
               dict_acao[key]['High'],
               dict_acao[key]['Low'],
               dict_acao[key]['Close'],
               dict_acao[key]['Volume'])
        dados.append(tup)
        
    cursor.executemany("insert into cotacao values (%s,%s,%s,%s,%s,%s,%s)",dados)
    connection.commit()  

connection.close()

#alimentando o banco com dados históricos dos índices
with connection.cursor() as cursor:
    cursor.execute("select ind_sigla, ind_codigo_yf from indice")
    indexes = [cod_index for cod_index in cursor.fetchall()]

cursor = connection.cursor()
for cod_index in indexes:
    try:
        df = yf.download(cod_index[1])
    except:
        print(f'Falhou para {cod_index[1]}')
    
    #removendo coluna Adj Close, Volume e removendo linhas com Na values
    df = df.drop(columns=['Adj Close','Volume'])
    df = df.dropna()
    #orient indica quais são os valores de orientação do dicionário
    #nesse caso, as chaves do dicionário são os valores dos índices dos elementos do DF
    dict_index = df.to_dict(orient='index')
        
    dados = []
    tup = ()
    for key in dict_index:
        tup = (key.date(),
               cod_index[0],
               dict_index[key]['Open'],
               dict_index[key]['High'],
               dict_index[key]['Low'],
               dict_index[key]['Close'])
        dados.append(tup)
        
    cursor.executemany("insert into cotacao_indice values (%s,%s,%s,%s,%s,%s)",dados)
    connection.commit()  

connection.close()
