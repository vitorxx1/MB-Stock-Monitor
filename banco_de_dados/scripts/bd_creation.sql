create database mb_stock_monitor;

use mb_stock_monitor;

create table empresa(
	emp_codigo varchar(4),
    emp_nome varchar(45) not null,
    constraint pk_empresa primary key(emp_codigo),
    constraint uq_emp_nome unique(emp_nome)
);

create table acao(
	aco_codigo varchar(8),
    emp_codigo varchar(4) not null,
    constraint pk_acao primary key(aco_codigo),
    constraint fk_acao_empresa foreign key(emp_codigo) references empresa(emp_codigo) on delete cascade
);

create table indice(
	ind_sigla varchar(15),
    ind_nome varchar(55) not null,
    constraint pk_indice primary key(ind_sigla),
    constraint uq_ind_nome unique(ind_nome)
);

create table listagem(
	aco_codigo varchar(8),
    ind_sigla varchar(15),
    list_quantidade bigint(12) not null,
    list_percentual decimal(5,3) not null,
    constraint fk_listagem_acao foreign key(aco_codigo) references acao(aco_codigo) on delete cascade on update cascade,
    constraint fk_listagem_indice foreign key(ind_sigla) references indice(ind_sigla) on delete cascade on update cascade,
    constraint pk_listagem primary key(aco_codigo, ind_sigla)
);

create table cotacao(
	cot_data date,
    aco_codigo varchar(8),
    cot_abertura decimal(6,2) not null,
    cot_max decimal(6,2) not null,
    cot_min decimal(6,2) not null,
    cot_fechamento decimal(6,2) not null,
    cot_volume int not null,
    constraint fk_cotacao_acao foreign key(aco_codigo) references acao(aco_codigo) on delete cascade on update cascade,
    constraint pk_cotacao primary key(cot_data, aco_codigo)
);

create table cotacao_indice(
	cot_ind_data date,
    ind_sigla varchar(15),
    cot_ind_abertura decimal(8,2) not null,
    cot_ind_max decimal(8,2) not null,
    cot_ind_min decimal(8,2) not null,
    cot_ind_fechamento decimal(8,2) not null,
    constraint fk_cotacao_indice_indice foreign key(ind_sigla) references indice(ind_sigla) on delete cascade on update cascade,
    constraint pk_cotacao_indice primary key(cot_ind_data, ind_sigla)
);


