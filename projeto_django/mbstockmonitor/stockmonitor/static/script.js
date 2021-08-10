var arrInd, acoes, ultimoDado = { prevDay: 0, lastDay: {} };
var input1 = document.getElementById('input-text');
var input2 = document.getElementById('input-text2');
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

/**
 * Autocomplete-list start
 */

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

/**
 * Autocomplete-list end
 */

/**
 * First Chart start
 */
function chartRenderOne(dados) {

    if (chartOne) {
        chartOne.destroy();
    }

    var annot = {};
    if (dados == arrChart.one.intraDay) {
        annot = {
            yaxis: [
                {
                    y: prevClose('one'),
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

    if ($("#acao_diff").hasClass('positive')) {
        tema.monochrome.color = '#3CE610';
    } else if ($("#acao_diff").hasClass('negative')) {
        tema.monochrome.color = '#FF0000';
    } else {
        tema.monochrome.color = '#5F6E7A';
    }

    var options = {
        series: [{
            data: dados
        }],
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 400,
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
/**
 * First Chart end
 */

/**
 * Second Chart start
 */
 function chartRenderTwo(dados) {

    if (chartTwo) {
        chartTwo.destroy();
    }

    // var tema = {
    //     mode: 'light',
    //     palette: 'palette1',
    //     monochrome: {
    //         enabled: true,
    //         color: '#255aee',
    //         shadeTo: 'light',
    //         shadeIntensity: 0.65
    //     },
    // };

    // if ($("#acao_diff").hasClass('positive')) {
    //     tema.monochrome.color = '#3CE610';
    // } else if ($("#acao_diff").hasClass('negative')) {
    //     tema.monochrome.color = '#FF0000';
    // } else {
    //     tema.monochrome.color = '#5F6E7A';
    // }

    var options = {
        series: [{
            data: dados
        }],
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 400,
            width: 400,
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
/**
 * Second Chart end
 */

/**
 * Manipulação de Dados
 */

function processIntraDay(arr, chart) {

    arrChart[chart].intraDay = [];

    var keys = Object.keys(arr);

    ultimoDado.lastDay = arr[keys.at(-1)];
    ultimoDado.lastDay.Open = arr[keys[0]].Open;

    var low = Number.MAX_SAFE_INTEGER, high = Number.MIN_SAFE_INTEGER;
    keys.forEach(e => {
        high = arr[e].High > high ? arr[e].High : high;
        low = arr[e].Low < low ? arr[e].Low : low;
        var aux = [];
        aux.push(new Date(e).getTime() - 10800000)
        aux.push(Number.parseFloat(arr[e].Close))
        arrChart[chart].intraDay.push(aux);
    })

    ultimoDado.lastDay.Low = low;
    ultimoDado.lastDay.High = high;
}

function processHist(arr, chart) {

    arrChart[chart].dadosHistoricos = [];

    var keys = Object.keys(arr);

    ultimoDado.prevDay = arr[keys.at(-1)].Close;

    keys.forEach(e => {
        var aux = [];
        aux.push(new Date(e + ' 17:00:00').getTime() - 10800000);
        aux.push(Number.parseFloat(arr[e].Close));

        arrChart[chart].dadosHistoricos.push(aux);
    });
}

/**
 * Manipulação de Dados
 */


/**
 *  Buttons events start
 */

$('#submit').on('click', function () {
    var inputValue = input1.value;
    $('.error').remove();
    if (acoes[$('#indexName').text()].includes(inputValue)) {
        $('#actionName').text(inputValue);
        clearAllAction();
        $.ajax({
            type: "POST",
            url: "stockmonitor/",
            data: {
                ticker: inputValue
            },
            dataType: "JSON",
            success: function (res) {

                processIntraDay(res["Dados do dia"], 'one');

                systemTime = new Date(arrChart['one'].intraDay.at(-1)[0] + 10800000);

                processHist(res["Dados Historicos"], 'one');

                processPropertiesAction();

                setTime(systemTime);

                resetCssClasses(null);
                document.getElementById('bt1').click();
            }
        });
    } else {
        $('#input-text').after('<div class="error">Valor Inválido</div>');
    }
    input1.value = '';
});

$('#submit2').on('click', function () {
    var inputValue = input2.value;
    $('.error').remove();
    if (arrInd.includes(inputValue)) {
        $('#indexName').text(inputValue);
        autocomplete(input1, acoes[inputValue])
        clearAllIndex();
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

                chartRenderTwo(arrChart['two'].intraDay)

                input1.value = acoes[inputValue][0];

                document.getElementById('submit').click();
            },
            error: function () {
                input1.value = acoes[inputValue][0];

                document.getElementById('submit').click();
            }
        });
    } else {
        $('#input-text2').after('<div class="error">Valor Inválido</div>');
    }
    input2.value = '';
});

$('#bt1').on('click', function () {
    if (!($(this).hasClass('active'))) {
        resetCssClasses(document.getElementById('bt1'));
        setDiff(prevClose('one'), 'one', 'último dia');
        chartRenderOne(arrChart.one.intraDay);
    }
});

$('#bt2').on('click', function () {
    if (!($(this).hasClass('active'))) {
        var newArr = arrChart.one.dadosHistoricos.filter(e => {
            return fillterArr(e[0], 9);
        });
        resetCssClasses(document.getElementById('bt2'));
        setDiff(newArr[0][1], 'one', 'última semana');
        chartRenderOne(newArr);
    }
});

$('#bt3').on('click', function () {
    if (!($(this).hasClass('active'))) {
        var newArr = arrChart.one.dadosHistoricos.filter(e => {
            return fillterArr(e[0], 30);
        });
        resetCssClasses(document.getElementById('bt3'));
        setDiff(newArr[0][1], 'one', 'último mês');
        chartRenderOne(newArr);
    }
});

$('#bt4').on('click', function () {
    if (!($(this).hasClass('active'))) {
        var newArr = arrChart.one.dadosHistoricos.filter(e => {
            return fillterArr(e[0], 180);
        });
        resetCssClasses(document.getElementById('bt4'));
        setDiff(newArr[0][1], 'one', 'último 6 meses');
        chartRenderOne(newArr);
    }
});

$('#bt5').on('click', function () {
    if (!($(this).hasClass('active'))) {
        var newArr = arrChart.one.dadosHistoricos.filter(e => {
            return fillterArr(e[0], 365);
        });
        resetCssClasses(document.getElementById('bt5'));
        setDiff(newArr[0][1], 'one', 'último ano');
        chartRenderOne(newArr);
    }
});

$('#bt6').on('click', function () {
    if (!($(this).hasClass('active'))) {
        var newArr = arrChart.one.dadosHistoricos.filter(e => {
            return fillterArr(e[0], 5 * 365);
        });
        resetCssClasses(document.getElementById('bt6'));
        setDiff(newArr[0][1], 'one', 'últimos 5 anos');
        chartRenderOne(newArr);
    }
});

$('#bt7').on('click', function () {
    if (!($(this).hasClass('active'))) {
        resetCssClasses(document.getElementById('bt7'));
        setDiff(arrChart.one.dadosHistoricos[0][1], 'one', 'desde o começo');
        chartRenderOne(arrChart.one.dadosHistoricos)
    }
});

$('#bt12').on('click', function () {
    
});

$('#bt22').on('click', function () {
    
});

$('#bt32').on('click', function () {
    
});

$('#bt42').on('click', function () {
    
});

$('#bt52').on('click', function () {
    
});

$('#bt62').on('click', function () {
    
});

$('#bt72').on('click', function () {
    
});
// /**
//  * Buttons events end
//  */



/**
 * Funções auxiliares start
 */
function prevClose(chart) {
    return arrChart[chart].dadosHistoricos.at(-1)[1];
}

function setDiff(prev, chart, periodo) {
    var atual = arrChart[chart].intraDay.at(-1)[1];
    var aux = ((atual / prev) - 1) * 100;

    var porcento = Number.parseFloat(aux.toFixed(2));
    porcento = Number.parseFloat(porcento).toLocaleString("pt-BR");
    porcento = formatString(porcento);

    if (aux > 0) {
        $('#acao_diff').text('+' + porcento + '% ' + periodo).removeClass('negative').addClass('positive')
    } else if (aux < 0) {
        $('#acao_diff').text(porcento + '% ' + periodo).removeClass('positive').addClass('negative')
    } else {
        $('#acao_diff').text('0,00%').removeClass('positive').removeClass('negative');
    }
}

function fillterArr(element, days) {
    return (element >= (new Date().getTime() - days * 86400000)) ? true : false;
}

function resetCssClasses(e) {
    $('.buttons').removeClass('active');
    if (e) { e.classList.add('active') };
}

function processPropertiesAction() {

    var open = Number.parseFloat(ultimoDado.lastDay.Open).toFixed(2);
    var high = Number.parseFloat(ultimoDado.lastDay.High).toFixed(2);
    var low = Number.parseFloat(ultimoDado.lastDay.Low).toFixed(2);
    var close = Number.parseFloat(ultimoDado.lastDay.Close).toFixed(2);
    var vol = Number.parseFloat(ultimoDado.lastDay.Volume).toFixed(2);
    var prevClose = Number.parseFloat(ultimoDado.prevDay).toFixed(2);

    open = Number.parseFloat(open).toLocaleString("pt-BR");
    high = Number.parseFloat(high).toLocaleString("pt-BR");
    low = Number.parseFloat(low).toLocaleString("pt-BR");
    close = Number.parseFloat(close).toLocaleString("pt-BR");
    vol = Number.parseFloat(vol).toLocaleString("pt-BR");
    prevClose = Number.parseFloat(prevClose).toLocaleString("pt-BR");

    open = formatString(open);
    high = formatString(high);
    low = formatString(low);
    close = formatString(close);
    vol = formatString(vol);
    prevClose = formatString(prevClose);


    $('#open').text(open);
    $('#high').text(high);
    $('#low').text(low);
    $('#close').text(close);
    $('#volume').text(vol);
    $('#prevClose').text(prevClose);

    var lastClose = Number.parseFloat(ultimoDado.prevDay)
    var actualClose = Number.parseFloat(ultimoDado.lastDay.Close)
    var aux = 100 - ((lastClose / actualClose) * 100);

    actualClose = Number.parseFloat(actualClose.toFixed(2));
    actualClose = Number.parseFloat(actualClose).toLocaleString("pt-BR");
    actualClose = formatString(actualClose);
    $('#valorDaAcao').text('R$' + actualClose + '  ');
}

function processPropertiesIndex() {

    var open = Number.parseFloat(ultimoDado.lastDay.Open).toFixed(2);
    var high = Number.parseFloat(ultimoDado.lastDay.High).toFixed(2);
    var low = Number.parseFloat(ultimoDado.lastDay.Low).toFixed(2);
    var close = Number.parseFloat(ultimoDado.lastDay.Close).toFixed(2);
    var vol = Number.parseFloat(ultimoDado.lastDay.Volume).toFixed(2);
    var prevClose = Number.parseFloat(ultimoDado.prevDay).toFixed(2);

    open = Number.parseFloat(open).toLocaleString("pt-BR");
    high = Number.parseFloat(high).toLocaleString("pt-BR");
    low = Number.parseFloat(low).toLocaleString("pt-BR");
    close = Number.parseFloat(close).toLocaleString("pt-BR");
    vol = Number.parseFloat(vol).toLocaleString("pt-BR");
    prevClose = Number.parseFloat(prevClose).toLocaleString("pt-BR");

    open = formatString(open);
    high = formatString(high);
    low = formatString(low);
    close = formatString(close);
    vol = formatString(vol);
    prevClose = formatString(prevClose);


    $('#open2').text(open);
    $('#high2').text(high);
    $('#low2').text(low);
    $('#close2').text(close);
    $('#volume2').text(vol);
    $('#prevClose2').text(prevClose);

    var lastClose = Number.parseFloat(ultimoDado.prevDay)
    var actualClose = Number.parseFloat(ultimoDado.lastDay.Close)
    var aux = 100 - ((lastClose / actualClose) * 100);

    actualClose = Number.parseFloat(actualClose.toFixed(2));
    actualClose = Number.parseFloat(actualClose).toLocaleString("pt-BR");
    actualClose = formatString(actualClose);
    $('#valorDoIndice').text('R$' + actualClose + '  ');

    var porcento = Number.parseFloat(aux.toFixed(2));
    porcento = Number.parseFloat(porcento).toLocaleString("pt-BR");
    porcento = formatString(porcento);

    if (aux > 0) {
        $('#index_diff').text('+' + porcento + '%').removeClass('negative').addClass('positive')
    } else {
        $('#index_diff').text(porcento + '%').removeClass('positive').addClass('negative')
    }

    if (!aux) $('#index_diff').removeClass('positive').removeClass('negative');
}

function formatString(str) {
    if (str == 'NaN') return '0,00';
    return str.includes(',') ? (str.at(-2) == ',' ? str.concat('0') : str) : str.concat(',00');
}

function clearAllAction() {
    $('#open').text('');
    $('#high').text('');
    $('#low').text('');
    $('#close').text('');
    $('#volume').text('');
    $('#prevClose').text('');
    $('#valorDaAcao').text('');
    $('#acao_diff').text('');
}

function clearAllIndex() {
    $('#open2').text('');
    $('#high2').text('');
    $('#low2').text('');
    $('#close2').text('');
    $('#volume2').text('');
    $('#prevClose2').text('');
    $('#valorDoIndice').text('');
    $('#index_diff').text('');
}

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

function isDayOff() {
    var timeSystem = systemTime.getTime();
    var timeToday = new Date().getTime();
    return (timeToday > timeSystem + 1200000) ? true : false;
}

function processIndexes() {
    var arrPercentValue = []
    var arrPercentText = [];
    var arrPreco = [];
    $(".indexName").each(function (index) {
        var input = $(this).text();
        $.ajax({
            type: "POST",
            async: false,
            url: "stock_diff/",
            data: {
                ticker: input
            },
            dataType: "JSON",
            success: function (res) {

                var percent = Number.parseFloat(res.percent).toFixed(2);
                var preco = Number.parseFloat(res.preco).toFixed(2);

                arrPercentValue.push(percent);

                percent = Number.parseFloat(percent).toLocaleString("pt-BR");
                preco = Number.parseFloat(preco).toLocaleString("pt-BR");

                percent = formatString(percent);
                preco = formatString(preco);

                if(arrPercentValue[index] > 0){
                    percent = '+' + percent + '%';
                }else if(arrPercentValue[index] < 0) {
                    percent = percent + '%';
                }

                arrPercentText.push(percent);
                arrPreco.push(preco);
            }
        });
    });
    $(".price").each(function (index) {
        $(this).text("R$ " + arrPreco[index]);
    });

    $(".var").each(function (index) {
        var $aux = $(this);
        $aux.text(arrPercentText[index])
        if (Number.parseFloat(arrPercentValue[index]) > 0) {
            $aux.addClass('positive');
            $aux.removeClass('negative');
        } else if (Number.parseFloat(arrPercentValue[index]) < 0) {
            $aux.addClass('negative');
            $aux.removeClass('positive');
        } else {
            $aux.removeClass('negative');
            $aux.removeClass('positive');
        }
    });
}

/**
 * Funções auxiliares end
 */

$(document).ready(function () {
    processIndexes();
    $.ajax({
        type: "GET",
        url: "index_stock/",
        async: false,
        dataType: "json",
        success: function (res) {
            acoes = res;
            arrInd = Object.keys(acoes);
            autocomplete(input2, arrInd);
            input2.value = arrInd[0];
            document.getElementById('submit2').click();
        }
    });
    // setInterval(processIndexes, 60000);
});

