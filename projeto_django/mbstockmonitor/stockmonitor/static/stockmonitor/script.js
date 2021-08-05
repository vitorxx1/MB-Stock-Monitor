import { countries } from "./arrays.js";

/**
 * First Chart start
 */
var options = {
    chart: {
        type: 'line',
        height: 400,
        width: 600,
        toolbar: {
            show: false
        }
    },
    series: [{
        name: 'sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
}

var chart = new ApexCharts(document.querySelector("#one"), options);

chart.render();
/**
 * First Chart end
 */

/**
 * Second Chart start
 */
var options2 = {
    chart: {
        type: 'line',
        height: 380,
        width: 380,
        toolbar: {
            show: false
        }
    },
    series: [{
        name: 'sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
}

var chart2 = new ApexCharts(document.querySelector("#two"), options2);

chart2.render();
/**
 * Second Chart end
 */

/**
 * Set time start
 */
var x = new Date();

var time = x.toDateString() + ' ' + x.getHours() + ':' + x.getMinutes() + ' GMT';

var timeZone = Number.parseInt(x.getTimezoneOffset());

if (timeZone > 0) {
    time += ((-1) * timeZone / 60);
} else {
    time += '+' + ((-1) * timeZone / 60);
}

document.getElementById("time").textContent = time;
/**
 * Set time end
 */

/**
 * Autocomplete-list start
 */
function autocomplete(input, arr) {
    let currentFocus;

    input.addEventListener('input', function (e) {

        if (this.value) {
            if (!this.value[this.value.length - 1].match(/\w/)) {
                this.value = this.value.substr(0, this.value.length - 1);
            }
        } else {
            return false;
        }

        var container, item, value = this.value;

        if (!value) {
            return false;
        }

        closeAllLists();

        currentFocus = -1;

        container = document.createElement('div');
        container.classList.add('autocomplete-list');
        this.parentNode.appendChild(container);

        arr.forEach(e => {
            var text = e.substr(0, value.length);
            if (text.toUpperCase() == value.toUpperCase()) {
                item = document.createElement('div');
                item.innerHTML = '<strong>' + text + '</strong>' + e.substr(value.length);
                item.innerHTML += '<input type="hidden" value="' + e + '">';
                item.addEventListener('click', function (e) {
                    input.value = this.getElementsByTagName('input')[0].value;
                    closeAllLists();
                });
                container.appendChild(item);
            }
        });
    });

    input.addEventListener('keydown', function (e) {

        var x = this.parentNode.getElementsByTagName('div')[0];

        if (x) {
            x = x.getElementsByTagName('div');
        }

        switch (e.keyCode) {
            case 40:
                currentFocus++;
                addActive(x);
                break;
            case 38:
                currentFocus--;
                addActive(x);
                break;
            case 13:
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) {
                        x[currentFocus].click();
                    }
                }
                break;
        }
    });

    function addActive(x) {
        if (!x) {
            return false;
        }
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
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

Array.prototype.forEach.call(document.getElementsByTagName('input'), function (e) {
    autocomplete(e, countries);
});

/**
 * Autocomplete-list end
 */

/**
 *  Buttons events start
 */

function submitButtons(bt, arr) {
    bt.addEventListener('click', function (e) {
        var classElements = document.getElementsByClassName(this.classList[0]);
        console.log(classElements);
        if (classElements.length > 2) {
            let label = classElements[0];
            let input = classElements[1];
            label.textContent = arr.find((e) => e == input.value) ? input.value : label.textContent;
        }
    });
}

Array.prototype.forEach.call(document.getElementsByClassName('submitbts'), function (e) { 
    submitButtons(e, countries);
 })



document.getElementById('bt1').addEventListener('click', function (e) {
    document.getElementById('actionValue').textContent = this.textContent;
});

document.getElementById('bt2').addEventListener('click', function (e) {
    document.getElementById('actionValue').textContent = this.textContent;
});

document.getElementById('bt3').addEventListener('click', function (e) {
    document.getElementById('actionValue').textContent = this.textContent;
});

document.getElementById('bt4').addEventListener('click', function (e) {
    document.getElementById('actionValue').textContent = this.textContent;
});

document.getElementById('bt5').addEventListener('click', function (e) {
    document.getElementById('actionValue').textContent = this.textContent;
});

document.getElementById('bt6').addEventListener('click', function (e) {
    document.getElementById('actionValue').textContent = this.textContent;
});

document.getElementById('bt7').addEventListener('click', function (e) {
    document.getElementById('actionValue').textContent = this.textContent;
});
/**
 * Buttons events end
 */

/**
 * Indexes start
 */
function attIndexes() {
    var values = document.getElementsByClassName('var');

    var new_value = Number.prototype.toFixed.call(Math.random() * 100, 2);


    if (new_value > 50) {
        Array.prototype.forEach.call(values, (e) => {
            e.textContent = '+' + new_value + '%';
            e.classList.remove('negative');
            e.classList.add('positive');
        });
    } else {
        Array.prototype.forEach.call(values, (e) => {
            e.textContent = '-' + new_value + '%';
            e.classList.remove('positive');
            e.classList.add('negative');
        });
    }

}

setInterval(attIndexes, 5000);

function attvalues() {
    var new_value = Number.prototype.toFixed.call(Math.random() * 100, 2);

    Array.prototype.forEach.call(document.getElementsByClassName('price'), (e) => {
        e.textContent = 'R$' + new_value;
    });
}

setInterval(attvalues, 7000);
/**
 * Indexes end
 */