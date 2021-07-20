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
var input = document.getElementById('input-text');

var currentFocus = -1;

input.addEventListener('input', function (e) {

    if (this.value) {
        if (!this.value[this.value.length - 1].match(/\w/)) {
            this.value = this.value.substr(0, this.value.length - 1)
        }
    }
    else {
        return false;
    }

    var container, item, index, value = this.value;

    if (!value) {
        return false
    }

    closeAllLists();

    currentFocus = -1;

    container = document.createElement('div');
    container.className = 'autocomplete-list';
    container.id = 'auto';

    this.parentNode.appendChild(container);

    countries.forEach(function (el) {
        let text = el.substr(0, value.length);
        if (text.toUpperCase() == value.toUpperCase()) {
            item = document.createElement('div');
            item.innerHTML = '<strong>' + text + '</strong>' + el.substr(value.length);
            item.innerHTML += '<input type="hidden" value="' + el + '">';
            item.addEventListener('click', function (e) {
                input.value = this.getElementsByTagName('input')[0].value;
                closeAllLists();
            });
            container.appendChild(item);
        }
    });
});

input.addEventListener('keydown', function (e) {
    var x = document.getElementById('auto');
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

function closeAllLists(el) {
    var x = document.getElementsByClassName('autocomplete-list');
    for (var i = 0; i < x.length; i++) {
        if (el != x[i] && el != input) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

document.addEventListener('click', function (e) {
    closeAllLists(e.target);
});

var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

/**
 * Autocomplete-list end
 */

/**
 *  Buttons events start
 */

var bttsbmt = document.getElementById('submit');

bttsbmt.addEventListener('click', function (e) {
    document.getElementById('actionName').textContent = countries.find((e) => e == input.value) ? input.value : document.getElementById('actionName').textContent;
});

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