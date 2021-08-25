var arrInd, acoes;
var intervalID = 0;
var ultimoDado = { prevDay: 0, lastDay: {} };
var arrChart = {
    one: {
        intraDay: [],
        dadosHistoricos: []
    },
    two: {
        intraDay: [],
        dadosHistoricos: []
    }
};
var chartOne;
var chartTwo;
var systemTime = new Date();

function chartRenderOne(dados, isIntraDay, cor) {

    if (chartOne) {
        chartOne.destroy();
    }

    var annot = {};
    if (isIntraDay) {
        annot = {
            yaxis: [
                {
                    y: arrChart["one"].dadosHistoricos.at(-2)[1],
                    borderColor: '#546E7A',
                    label: {
                        borderColor: '#546E7A',
                        style: {
                            color: '#fff',
                            background: '#546E7A'
                        },
                        offsetX: -30,
                        offsetY: 14,
                        text: 'Prev Close'
                    }
                }
            ]
        };
    }

    var tema = {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
            enabled: true,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
        },
    };

    switch (cor) {
        case 1:
            tema.monochrome.color = '#3CE610';
            break;
        case 2:
            tema.monochrome.color = '#FF0000';
            break;
        default:
            tema.monochrome.color = '#5F6E7A';
            break;
    }

    var options = {
        series: [{
            data: dados
        }],
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 500,
            width: 600,
            zoom: {
                autoScaleYaxis: true
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            tooltip: {
                enabled: false
            },
            type: 'datetime',
            tickAmount: 6,
        },
        tooltip: {
            enabled: true,
            x: {
                format: 'dd MMM yyyy HH:mm'
            },
            y: {
                formatter: (e) => { return 'R$' + e },
                title: {
                    formatter: (e) => { return 'Preço:' }
                }
            },
            marker: false
        },
        annotations: annot,
        theme: tema,
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    }

    chartOne = new ApexCharts(document.getElementById('one'), options);

    chartOne.render();
}

function chartRenderTwo(dados, cor) {

    if (chartTwo) {
        chartTwo.destroy();
    }

    var tema = {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
            enabled: true,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
        },
    };

    switch (cor) {
        case 1:
            tema.monochrome.color = '#3CE610';
            break;
        case 2:
            tema.monochrome.color = '#FF0000';
            break;
        default:
            tema.monochrome.color = '#5F6E7A';
            break;
    }

    var options = {
        series: [{
            data: dados
        }],
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            width: 450,
            zoom: {
                autoScaleYaxis: true
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            tooltip: {
                enabled: false
            },
            type: 'datetime',
            tickAmount: 6,
        },
        tooltip: {
            enabled: true,
            x: {
                format: 'dd MMM yyyy HH:mm'
            },
            y: {
                formatter: (e) => { return 'R$' + e },
                title: {
                    formatter: (e) => { return 'Preço:' }
                }
            },
            marker: false
        },
        theme: tema,
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    }

    chartTwo = new ApexCharts(document.getElementById('two'), options);

    chartTwo.render();
}

/** Função de autocomplete nos campos de texto */
function autocomplete(input, arr) {
    var currentFocus;

    input.addEventListener('input', function (e) {
        var inputValue = this.value;
        var inputLength = inputValue.length;

        if (inputValue) {
            if (!inputValue[inputLength - 1].match(/\w/)) {
                inputValue = inputValue.substr(0, inputLength - 1);
                this.value = inputValue;
            }
        }

        var container, item;
        currentFocus = -1;

        closeAllLists();

        container = document.createElement('div');
        container.classList.add('autocomplete-list');
        this.parentNode.appendChild(container);

        if (inputValue) {
            arr.forEach(e => {
                var text = e.substr(0, inputLength);
                if (text.toUpperCase() == inputValue.toUpperCase()) {
                    item = document.createElement('div');
                    item.innerHTML = '<strong>' + text + '</strong>' + e.substr(inputLength);
                    item.innerHTML += '<input type="hidden" value="' + e + '">';
                    item.addEventListener('click', function (e) {
                        input.value = this.getElementsByTagName('input')[0].value;
                        closeAllLists();
                    });
                    container.appendChild(item);
                }
            });
        } else {
            arr.forEach(e => {
                item = document.createElement('div');
                item.textContent = e;
                item.innerHTML += '<input type="hidden" value="' + e + '">';
                item.addEventListener('click', function (e) {
                    input.value = this.getElementsByTagName('input')[0].value;
                    closeAllLists();
                });
                container.appendChild(item);
            });
        }
    });

    input.addEventListener('keydown', function (e) {

        var container = this.parentNode.getElementsByTagName('div')[0];

        if (container) {
            x = container.getElementsByTagName('div');
        } else {
            return false;
        }

        switch (e.keyCode) {
            case 40:
                currentFocus++;
                if (currentFocus >= x.length) {
                    currentFocus = 0;
                    container.scrollTop = 0;
                } else {
                    container.scrollTop = x[currentFocus].offsetTop > container.scrollTopMax ? container.scrollTopMax : x[currentFocus].offsetTop - 40;
                }
                addActive(x);
                break;
            case 38:
                currentFocus--;
                if (currentFocus < 0) {
                    currentFocus = x.length - 1;
                    container.scrollTop = container.scrollTopMax;
                } else {
                    container.scrollTop = x[currentFocus].offsetTop > container.scrollTopMax ? container.scrollTopMax : x[currentFocus].offsetTop - 40;
                }
                addActive(x);
                break;
            case 13:
                e.preventDefault();
                if (currentFocus > -1) {
                    x[currentFocus].click();
                }
                break;
        }
    });

    function addActive(x) {
        removeActive(x);
        x[currentFocus].classList.add('autocomplete-active');
    }

    function removeActive(x) {
        for (let index = 0; index < x.length; index++) {
            x[index].classList.remove('autocomplete-active');
        }
    }

    function closeAllLists(e) {
        var x = document.getElementsByClassName('autocomplete-list');
        for (var i = 0; i < x.length; i++) {
            if (e != x[i] && e != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener('click', function (e) {
        closeAllLists(e.target);
    });
};

/** Verifica se os dados históricos contém o close de hoje */
function hasTodayClose(chart) {
    var dataHist = new Date(arrChart[chart].dadosHistoricos.at(-1)[0]);
    var dataIntra = new Date(arrChart[chart].intraDay.at(-1)[0]);
    return dataHist.getDate() == dataIntra.getDate();
}

/** Processa os dados intraDay */
function processIntraDay(arr, chart) {

    arrChart[chart].intraDay = [];

    if (!Object.values(arr).length) {
        return false;
    }

    var keys = Object.keys(arr);

    ultimoDado.lastDay = arr[keys.at(-1)];
    ultimoDado.lastDay.Open = arr[keys[0]].Open;

    var low = Number.MAX_SAFE_INTEGER, high = Number.MIN_SAFE_INTEGER;
    keys.forEach(e => {
        var element = arr[e];
        high = element.High > high ? element.High : high;
        low = element.Low < low ? element.Low : low;
        var aux = [];
        aux.push(new Date(e).getTime() - 10800000)
        aux.push(Number.parseFloat(element.Close))
        arrChart[chart].intraDay.push(aux);
    })

    ultimoDado.lastDay.Low = low;
    ultimoDado.lastDay.High = high;
}

/** Processa os dados históricos */
function processHist(arr, chart) {

    arrChart[chart].dadosHistoricos = [];

    if (!Object.values(arr).length) {
        return false;
    }

    var keys = Object.keys(arr);

    keys.forEach(e => {
        var aux = [];
        aux.push(new Date(e + ' 17:00:00').getTime() - 10800000);
        aux.push(Number.parseFloat(arr[e].Close));

        arrChart[chart].dadosHistoricos.push(aux);
    });

    if (!hasTodayClose(chart)) {
        arrChart[chart].dadosHistoricos.push(arrChart[chart].intraDay.at(-1));
    } else {
        arrChart[chart].intraDay.push(arrChart[chart].dadosHistoricos.at(-1));
        ultimoDado.lastDay.Close = arrChart[chart].intraDay.at(-1)[1];

        if (ultimoDado.lastDay.Close > ultimoDado.lastDay.High) {
            ultimoDado.lastDay.High = ultimoDado.lastDay.Close;
        }

        if (ultimoDado.lastDay.Close < ultimoDado.lastDay.Low) {
            ultimoDado.lastDay.Low = ultimoDado.lastDay.Close;
        }
    }

    ultimoDado.prevDay = arrChart[chart].dadosHistoricos.at(-2)[1];
}

/**Função que adiciona todas os eventos dos botões */
function buttonEvents() {

    /** Seta as propiedades do primeiro gráfico(ações) */
    function processPropertiesAction() {
        var close = formatNumber(ultimoDado.lastDay.Close);
        $('#open').text(formatNumber(ultimoDado.lastDay.Open));
        $('#high').text(formatNumber(ultimoDado.lastDay.High));
        $('#low').text(formatNumber(ultimoDado.lastDay.Low));
        $('#close').text(close);
        $('#volume').text(formatNumber(ultimoDado.lastDay.Volume));
        $('#prevClose').text(formatNumber(ultimoDado.prevDay));
        $('#valorDaAcao').text('R$' + close + '  ');
    }

    /** Seta as propiedades do segundo gráfico(index) */
    function processPropertiesIndex() {
        var close = formatNumber(ultimoDado.lastDay.Close);
        $('#open2').text(formatNumber(ultimoDado.lastDay.Open));
        $('#high2').text(formatNumber(ultimoDado.lastDay.High));
        $('#low2').text(formatNumber(ultimoDado.lastDay.Low));
        $('#close2').text(close);
        $('#volume2').text(formatNumber(ultimoDado.lastDay.Volume));
        $('#prevClose2').text(formatNumber(ultimoDado.prevDay));
        $('#valorDoIndice').text('R$' + close + '  ');
    }

    /** Reseta todas as classes dos botões do primeiro gráfico e ativa o clickado*/
    function resetCssClasses(classe, e) {
        $(classe).removeClass('active');
        if (e) { e.addClass('active') };
    }

    /** filtra o array de dados históricos retornando somente o período passado */
    function filterArray(chart, days) {
        var newArray = arrChart[chart].dadosHistoricos.filter(e => {
            return (e[0] >= (new Date().getTime() - days * 86400000)) ? true : false;
        });
        return newArray;
    }

    /** Calcula a porcentagem de diferença entra o close atual e o periodo do gráfico */
    function setDiff(prev, atual, periodo, id) {
        var diff = formatPorcentagem((atual / prev - 1) * 100);
        var _diff = $(id);
        _diff.text(diff.str + periodo).removeClass("positive negative")

        if (diff.number > 0) {
            _diff.addClass("positive");
            return 1;
        } else if (diff.number < 0) {
            _diff.addClass("negative");
            return 2;
        }

        return 0;
    }

    /** Valor atual do gráfico */
    function actualClose(chart) {
        return arrChart[chart].intraDay.at(-1)[1];
    }

    /** Eventos dos botões do primeiro gráfico */
    $('#bt1').on('click', function () {
        if (!($(this).hasClass('active'))) {
            resetCssClasses(".buttons", $(this));
            var cor = setDiff(arrChart.one.dadosHistoricos.at(-2)[1], actualClose("one"), 'último dia', "#acao_diff");
            chartRenderOne(arrChart.one.intraDay, 1, cor);
        }
    });

    $('#bt2').on('click', function () {
        if (!($(this).hasClass('active'))) {
            var newArr = filterArray('one', 9);
            resetCssClasses(".buttons", $(this));
            var cor = setDiff(newArr[0][1], actualClose("one"), 'última semana', "#acao_diff");
            chartRenderOne(newArr, 0, cor);
        }
    });

    $('#bt3').on('click', function () {
        if (!($(this).hasClass('active'))) {
            var newArr = filterArray('one', 30);
            resetCssClasses(".buttons", $(this));
            var cor = setDiff(newArr[0][1], actualClose("one"), 'último mês', "#acao_diff");
            chartRenderOne(newArr, 0, cor);
        }
    });

    $('#bt4').on('click', function () {
        if (!($(this).hasClass('active'))) {
            var newArr = filterArray('one', 180);
            resetCssClasses(".buttons", $(this));
            var cor = setDiff(newArr[0][1], actualClose("one"), 'último 6 meses', "#acao_diff");
            chartRenderOne(newArr, 0, cor);
        }
    });

    $('#bt5').on('click', function () {
        if (!($(this).hasClass('active'))) {
            var newArr = filterArray('one', 365);
            resetCssClasses(".buttons", $(this));
            var cor = setDiff(newArr[0][1], actualClose("one"), 'último ano', "#acao_diff");
            chartRenderOne(newArr, 0, cor);
        }
    });

    $('#bt6').on('click', function () {
        if (!($(this).hasClass('active'))) {
            var newArr = filterArray('one', 5 * 365);
            resetCssClasses(".buttons", $(this));
            var cor = setDiff(newArr[0][1], actualClose("one"), 'últimos 5 anos', "#acao_diff");
            chartRenderOne(newArr, 0, cor);
        }
    });

    $('#bt7').on('click', function () {
        if (!($(this).hasClass('active'))) {
            resetCssClasses(".buttons", $(this));
            var cor = setDiff(arrChart.one.dadosHistoricos[0][1], actualClose("one"), 'desde o começo', "#acao_diff");
            chartRenderOne(arrChart.one.dadosHistoricos, 0, cor);
        }
    });

    /** Eventos dos botões do segundo gráfico */

    $('#bt12').on('click', function () {
        if (!($(this).hasClass('active'))) {
            resetCssClasses(".buttons2", $(this));
            var cor = setDiff(arrChart.two.dadosHistoricos.at(-2)[1], actualClose("two"), 'último dia', "#index_diff");
            chartRenderTwo(arrChart.two.intraDay, cor);
        }
    });

    $('#bt22').on('click', function () {
        if (!($(this).hasClass('active'))) {
            var newArr = filterArray('two', 9);
            resetCssClasses(".buttons2", $(this));
            var cor = setDiff(newArr[0][1], actualClose("two"), 'última semana', "#index_diff");
            chartRenderTwo(newArr, cor);
        }
    });

    $('#bt32').on('click', function () {
        if (!($(this).hasClass('active'))) {
            var newArr = filterArray('two', 30);
            resetCssClasses(".buttons2", $(this));
            var cor = setDiff(newArr[0][1], actualClose("two"), 'último mês', "#index_diff");
            chartRenderTwo(newArr, cor);
        }
    });

    $('#bt42').on('click', function () {
        if (!($(this).hasClass('active'))) {
            var newArr = filterArray('two', 180);
            resetCssClasses(".buttons2", $(this));
            var cor = setDiff(newArr[0][1], actualClose("two"), 'último 6 meses', "#index_diff");
            chartRenderTwo(newArr, cor);
        }
    });

    $('#bt52').on('click', function () {
        if (!($(this).hasClass('active'))) {
            var newArr = filterArray('two', 365);
            resetCssClasses(".buttons2", $(this));
            var cor = setDiff(newArr[0][1], actualClose("two"), 'último ano', "#index_diff");
            chartRenderTwo(newArr, cor);
        }
    });

    $('#bt62').on('click', function () {
        if (!($(this).hasClass('active'))) {
            var newArr = filterArray('two', 5 * 365);
            resetCssClasses(".buttons2", $(this));
            var cor = setDiff(newArr[0][1], actualClose("two"), 'últimos 5 anos', "#index_diff");
            chartRenderTwo(newArr, cor);
        }
    });

    $('#bt72').on('click', function () {
        if (!($(this).hasClass('active'))) {
            resetCssClasses(".buttons2", $(this));
            var cor = setDiff(arrChart.two.dadosHistoricos[0][1], actualClose("two"), 'desde o começo', "#index_diff");
            chartRenderTwo(arrChart.one.dadosHistoricos, cor);
        }
    });

    /**Eventos dos botões de submit */
    var $indexName = $("#indexName");
    var $input1 = $("#input-text");

    $('#submit').on('click', function () {
        var inputValue = $input1.val();
        $('.error').remove();
        if (acoes[$indexName.text()].includes(inputValue)) {
            $('#actionName').text(inputValue);
            $(".props1").text("0,00");
            $.ajax({
                type: "POST",
                url: "stockmonitor/",
                data: {
                    ticker: inputValue
                },
                dataType: "JSON",
                success: function (res) {

                    processIntraDay(res["Dados do dia"], 'one');

                    processHist(res["Dados Historicos"], 'one');

                    systemTime = new Date(arrChart['one'].intraDay.at(-1)[0] + 10800000);

                    processPropertiesAction();

                    setTime(systemTime);

                    resetCssClasses(".buttons", null);
                    document.getElementById('bt1').click();
                },
                error: function () {
                }
            });
        } else {
            $input1.after('<div class="error">Valor Inválido</div>');
        }
        $input1.val('');
    });

    $('#submit2').on('click', function () {
        var $input2 = $("#input-text2");
        var inputValue = $input2.val();
        $('.error').remove();
        if (arrInd.includes(inputValue)) {
            $indexName.text(inputValue);
            autocomplete($input1[0], acoes[inputValue])
            $(".props2").text("0,00");
            $.ajax({
                type: "POST",
                url: "index/",
                data: {
                    ticker: inputValue
                },
                dataType: "JSON",
                success: function (res) {
                    processIntraDay(res["Dados do dia"], 'two');

                    processHist(res["Dados Historicos"], 'two');

                    processPropertiesIndex();

                    // processIndexes(acoes[inputValue].slice(0, 10));

                    // resetCssClasses(".buttons2", null);

                    // document.getElementById('bt12').click();
                },
                error: function () {

                },
                complete: function () {
                    continuousLoop(acoes[inputValue].slice(0, 10), 0);
                    clearInterval(intervalID);
                    intervalID = setInterval(continuousLoop, 60000, acoes[inputValue].slice(0, 10), 0);
                    // $input1.val(acoes[inputValue][0]);
                    // document.getElementById('submit').click();
                }
            });
        } else {
            $input2.after('<div class="error">Valor Inválido</div>');
        }
        $input2.val('');
    });

}

/** Formata um número para o padrão brasileiro com duas casas decimais */
function formatNumber(str) {
    str = Number.parseFloat(str).toFixed(2);
    str = Number.parseFloat(str).toLocaleString("pt-BR");

    if (str == 'NaN') return '0,00';
    return str.includes(',') ? (str.at(-2) == ',' ? str + "0" : str) : str + ",00";
}

/** Formata uma porcentagem para o padrão brasileiro com duas casas decimais */
function formatPorcentagem(value) {

    var str_formatted = {
        str: '',
        number: value,
    }

    str_formatted.str = formatNumber(value) + '%';

    if (str_formatted.number >= 0) {
        str_formatted.str = "+" + str_formatted.str;
    }

    return str_formatted;
}

/** Retorna o dia da semana em português */
function dayOfTheWeek(day) {
    switch (day) {
        case 0:
            return 'Dom ';
        case 1:
            return 'Seg ';
        case 2:
            return 'Ter ';
        case 3:
            return 'Qua ';
        case 4:
            return 'Qui ';
        case 5:
            return 'Sex ';
        default:
            return 'Sab ';
    }
}

/** Retorna o mês do ano em português */
function monthOfTheYear(month) {
    switch (month) {
        case 0:
            return 'Jan ';
        case 1:
            return 'Fev ';
        case 2:
            return 'Mar ';
        case 3:
            return 'Abr ';
        case 4:
            return 'Mai ';
        case 5:
            return 'Jun ';
        case 6:
            return 'Jul ';
        case 7:
            return 'Ago ';
        case 8:
            return 'Set ';
        case 9:
            return 'Out ';
        case 10:
            return 'Nov ';
        default:
            return 'Dez ';
    }
}

/** Imprime o tempo do sistema em relação à ação em destaque */
function setTime(today) {

    var time = '';
    time = dayOfTheWeek(today.getDay());
    time += today.getDate() + ' ';
    time += monthOfTheYear(today.getMonth());
    time += today.getFullYear() + ' ';
    time += today.getHours() + ':' + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
    time += ' GMT-3';

    $('#time').text(time);
}

/** Inicia a rolagem de texto */
function startLoop() {
    $("#grouploop-1").grouploop({
        velocity: 0.5,
        forward: false,
        childNode: ".item",
        childWrapper: ".item-wrap",
        pauseOnHover: true
    });
}

/** Faz as atualizações dos indexes */
function continuousLoop(arr, i) {
    if (!arr.length || i > 9) {
        return false;
    }
    var $index = $("h4")[i];
    if ($index.textContent != arr[0]) {
        $index.textContent = arr[0];
        $("h4")[i + 10].textContent = arr[0];
    }
    $.ajax({
        type: "POST",
        url: "stock_diff/",
        data: {
            ticker: arr[0]
        },
        dataType: "JSON",
        success: function (res) {
            var aux = formatPorcentagem(res.percent);
            var $valor = $(".var").eq(i);
            var $valor2 = $(".var").eq(i + 10);
            if ($valor.text() != aux.str) {
                $(".price")[i].textContent = "R$ " + formatNumber(res.preco);
                $(".price")[i + 10].textContent = "R$ " + formatNumber(res.preco);
                $valor.text(aux.str).removeClass('negative positive nulo');
                $valor2.text(aux.str).removeClass('negative positive nulo');
                if (aux.number > 0) {
                    $valor.addClass('positive');
                    $valor2.addClass('positive');
                } else if (aux.number < 0) {
                    $valor.addClass('negative');
                    $valor2.addClass('negative');
                } else {
                    $valor.addClass('nulo');
                    $valor2.addClass('nulo');
                }
                console.log("MUDANÇA DE VALORES EM " + arr[0]);
            }
        },
        complete: function () {
            continuousLoop(arr.slice(1), i + 1);
        }
    });
}

/** Primeira chamada para os indexes */
function processIndexes(arr) {
    var arrPercent = [];
    var arrPreco = [];
    $(".item h4").each(function (index) {
        var input = $(this).text(arr[index]).text();
        $.ajax({
            type: "POST",
            async: false,
            url: "stock_diff/",
            data: {
                ticker: input
            },
            dataType: "JSON",
            success: function (res) {
                arrPercent.push(formatPorcentagem(res.percent));
                arrPreco.push(formatNumber(res.preco));

            }
        });
    });
    $(".price").each(function (index) {
        $(this).text("R$ " + arrPreco[index]);
    });
    $(".var").each(function (index) {
        var $aux = $(this);
        var aux = arrPercent[index];
        $aux.text(aux.str).removeClass('negative positive nulo');
        if (aux.number > 0) {
            $aux.addClass('positive');
        } else if (aux.number < 0) {
            $aux.addClass('negative');
        } else {
            $aux.addClass('nulo')
        }
    });
}

/** Inicia o site */
function main() {
    $.ajax({
        type: "GET",
        url: "index_stock/",
        async: false,
        dataType: "json",
        success: function (res) {
            var input2 = document.getElementById("input-text2");
            acoes = res;
            arrInd = Object.keys(acoes);
            autocomplete(input2, arrInd);
            input2.value = arrInd[0];
            document.getElementById('submit2').click();
            startLoop();
        },
        error: main
    });
}

$(document).ready(function () {
    buttonEvents();
    main();
});

