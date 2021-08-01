# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Acao(models.Model):
    aco_codigo = models.CharField(primary_key=True, max_length=8)
    emp_codigo = models.ForeignKey('Empresa', models.DO_NOTHING, db_column='emp_codigo')

    class Meta:
        managed = False
        db_table = 'acao'


class Cotacao(models.Model):
    cot_data = models.DateField(primary_key=True)
    aco_codigo = models.ForeignKey(Acao, models.DO_NOTHING, db_column='aco_codigo')
    cot_abertura = models.DecimalField(max_digits=6, decimal_places=2)
    cot_max = models.DecimalField(max_digits=6, decimal_places=2)
    cot_min = models.DecimalField(max_digits=6, decimal_places=2)
    cot_fechamento = models.DecimalField(max_digits=6, decimal_places=2)
    cot_volume = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'cotacao'
        unique_together = (('cot_data', 'aco_codigo'),)


class CotacaoIndice(models.Model):
    cot_ind_data = models.DateField(primary_key=True)
    ind_sigla = models.ForeignKey('Indice', models.DO_NOTHING, db_column='ind_sigla')
    cot_ind_abertura = models.DecimalField(max_digits=8, decimal_places=2)
    cot_ind_max = models.DecimalField(max_digits=8, decimal_places=2)
    cot_ind_min = models.DecimalField(max_digits=8, decimal_places=2)
    cot_ind_fechamento = models.DecimalField(max_digits=8, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'cotacao_indice'
        unique_together = (('cot_ind_data', 'ind_sigla'),)


class Empresa(models.Model):
    emp_codigo = models.CharField(primary_key=True, max_length=4)
    emp_nome = models.CharField(unique=True, max_length=45)

    class Meta:
        managed = False
        db_table = 'empresa'


class Indice(models.Model):
    ind_sigla = models.CharField(primary_key=True, max_length=15)
    ind_nome = models.CharField(unique=True, max_length=55)
    ind_codigo_yf = models.CharField(unique=True, max_length=8)

    class Meta:
        managed = False
        db_table = 'indice'


class Listagem(models.Model):
    aco_codigo = models.OneToOneField(Acao, models.DO_NOTHING, db_column='aco_codigo', primary_key=True)
    ind_sigla = models.ForeignKey(Indice, models.DO_NOTHING, db_column='ind_sigla')
    list_quantidade = models.BigIntegerField()
    list_percentual = models.DecimalField(max_digits=5, decimal_places=3)

    class Meta:
        managed = False
        db_table = 'listagem'
        unique_together = (('aco_codigo', 'ind_sigla'),)
