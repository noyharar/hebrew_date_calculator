let date = document.getElementById('date');
let sunset = document.getElementById('sunset');
let events = document.getElementById('events');
let fullDate = document.getElementById('fullDate');

const currentDate = (new Date()).toISOString().substring(0, 10);
date.value = currentDate;
let afterSunset = "off";

let form = document.forms["my-form"];
form.addEventListener("submit", getHebrewDate);

function getHebrewDate(event){
    event.preventDefault();
    let urlDate = date.value;

    if(sunset.checked === true){
        afterSunset = "on"
    }else{
        afterSunset = "off"
    }

    $.getJSON('https://www.hebcal.com/converter?cfg=json&date='+ urlDate +'&g2h=1&strict=1&gs=' + afterSunset, function(data){
        const dateSuffix = getSuffix(data.hd);
        const dateStr = new Date(urlDate).toDateString();
        const hebrewDate = `${data.hd}${dateSuffix} of ${data.hm} , ${data.hy}`;
        fullDate.innerHTML =`<b><div><div>${dateStr} = ${hebrewDate}<br></div><div class="center">${data.hebrew}</div></div></b>`
        events.innerHTML = '';
        data.events.forEach(el => {
            events.innerHTML += `<div class="center">${el}</div>`;
        });
    });
}

const getSuffix = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};