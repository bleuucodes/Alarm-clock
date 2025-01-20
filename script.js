const currentTime = document.querySelector('h1'),
    content = document.querySelector('.content'),
    selectMenu = document.querySelectorAll('select'),
    alarmbutton = document.querySelector('button');

let alarmTime;
let isAlarmSet;
let ringtone = new Audio("./files/ringtone.mp3");

//Select Menu
for (i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value=${i}>${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option)
}

for (i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value=${i}>${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option)
}

for (i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM"
    let option = `<option value=${ampm}>${ampm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML('afterend', option)
}

// Clock
setInterval(() => {
    let timeNow = new Date(),
        h = timeNow.getHours(),
        m = timeNow.getMinutes(),
        s = timeNow.getSeconds();
    ampm = "AM"
    if (h >= 12) {
        h = h - 12;  // hour range 0 - 11 
        ampm = "PM";
    }
    // hour range 1-12
    h = h == 0 ? h = 12 : h;
    // adding 0 if less than 10
    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    currentTime.textContent = `${h}:${m}:${s} ${ampm}`

    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
        alarmbutton.textContent = "Stop Alarm"
    }
})

// alarm
function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove('disable');
        alarmbutton.textContent = "Set Alarm";
        return isAlarmSet = false;
    }

    let alarm = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (alarm.includes('Hour') || alarm.includes('Minute') || alarm.includes('AM/PM')) {
        return alert('Please, select a valid time to set Alarm!')
    }

    alarmTime = alarm;
    isAlarmSet = true;
    content.classList.add('disable')
    alarmbutton.textContent = "Clear Alarm"
}
console.log(isAlarmSet)
alarmbutton.addEventListener('click', setAlarm)