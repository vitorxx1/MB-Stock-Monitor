export const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];


// input.addEventListener('input', function (e) {

//     if (this.value) {
//         if (!this.value[this.value.length - 1].match(/\w/)) {
//             this.value = this.value.substr(0, this.value.length - 1)
//         }
//     }
//     else {
//         return false;
//     }

//     var container, item, index, value = this.value;

//     if (!value) {
//         return false
//     }

//     closeAllLists();

//     currentFocus = -1;

//     container = document.createElement('div');
//     container.className = 'autocomplete-list';
//     container.id = 'auto';

//     this.parentNode.appendChild(container);

//     countries.forEach(function (el) {
//         let text = el.substr(0, value.length);
//         if (text.toUpperCase() == value.toUpperCase()) {
//             item = document.createElement('div');
//             item.innerHTML = '<strong>' + text + '</strong>' + el.substr(value.length);
//             item.innerHTML += '<input type="hidden" value="' + el + '">';
//             item.addEventListener('click', function (e) {
//                 input.value = this.getElementsByTagName('input')[0].value;
//                 closeAllLists();
//             });
//             container.appendChild(item);
//         }
//     });
// });

// bttsbmt.addEventListener('click', function (e) {
//     document.getElementById('actionName').textContent = countries.find((e) => e == input.value) ? input.value : document.getElementById('actionName').textContent;
// });

//input.addEventListener('keydown', function (e) {
    //     var x = document.getElementById('auto');
    //     if (x) {
    //         x = x.getElementsByTagName('div');
    //     }
    
    //     switch (e.keyCode) {
    //         case 40:
    //             currentFocus++;
    //             addActive(x);
    //             break;
    //         case 38:
    //             currentFocus--;
    //             addActive(x);
    //             break;
    //         case 13:
    //             e.preventDefault();
    //             if (currentFocus > -1) {
    //                 if (x) {
    //                     x[currentFocus].click();
    //                 }
    //             }
    //             break;
    //     }
    // });