
var hour = 0, min = 0, sec = 0, msec = 0, count = 0;     //global varibales 

const splitTime = {                        //object which we used in splittime
    sphour: 0,
    spmin: 0,
    spsec: 0,
    spmsec: 0,
};

let spHour = 0, spMin = 0, spSec = 0; spMsec = 0;

var minHeading = document.getElementById("min");
var secHeading = document.getElementById("sec");
var msecHeading = document.getElementById("msec");
var hourHeading = document.getElementById("hour");


var clockTick = new Audio("./audio/clock-tick.mp3");



function timer() {





    msec++;
    msecHeading.innerHTML = msec;
    if (msec >= 100) {
        sec++;
        srotation = 6 * sec;
        msec = 0;

        if (sec <= 9) {
            secHeading.innerHTML = `0${sec}:`;
        }
        else {
            secHeading.innerHTML = `${sec}:`;
        }

        /* Analog watch */
        secA.style.transform = `rotate(${srotation}deg)`;
        clockTick.play();





    }

    else if (sec >= 60) {
        min++;
        mrotation = 6 * min;
        sec = 0;

        if (min <= 9) {
            minHeading.innerHTML = `0${min}:`;
        }
        else {
            minHeading.innerHTML = `${min}:`;
        }

        /* Analog watch */
        minA.style.transform = `rotate(${mrotation}deg)`;
    }
    else if (min >= 60) {
        hour++;
        hrotation = 30 * hour + min / 2;
        min = 0;

        if (hour <= 9) {
            hourHeading.innerHTML = `0${hour}:`;
        }
        else {
            hourHeading.innerHTML = `${hour}:`;
        }

        /* Analog watch */
        hourA.style.transform = `rotate(${hrotation}deg)`;
        clockTick.play();

    }
    else if (hour >= 24) {
        reset();               //stop watch limit is 24 hours after this it will stop
    }

}

function start() {


    interval = setInterval(timer, 10);


    let splitBtn = document.getElementById("split-btn");  //undisabling the split btn after start
    let start = document.getElementById("start-btn");

    splitBtn.disabled = false;

    /* Changing CSS */
    splitBtn.style.cursor = "pointer";
    start.style.cursor = "no-drop"

}
function pause() {

    clearInterval(interval);



    let start = document.getElementById("start-btn");     //start button will undisabled after click pause
    let splitBtn = document.getElementById("split-btn");  //undisabling the split btn after start

    splitBtn.disabled = true;
    start.disabled = false;

    /* Changing CSS */
    splitBtn.style.cursor = "no-drop";
    start.style.cursor = "pointer"

    clockTick.pause();

}
function reset() {

    hour = 0, min = 0, sec = 0, msec = 0, count = 0;

    hourHeading.innerHTML = `${hour}0:`;
    minHeading.innerHTML = `${min}0:`;
    secHeading.innerHTML = `${sec}0:`;
    msecHeading.innerHTML = `${msec}0`;


    pause();
    deleteLaps();

    //As deleteLaps will delete the div so we have to create it again
    let mainContainer = document.querySelector(".main-container")
    let lapsWrapper = document.createElement("div");
    lapsWrapper.className = "laps-wrapper";
    mainContainer.appendChild(lapsWrapper);


    var start = document.getElementById("start");   //start button will undisabled after click reset
    start.disabled = false;


}

function deleteLaps() {

    alert("Are you sure? All timings will be lost when you reset.");

    var laps = document.querySelector(".laps-wrapper");
    laps.remove();



    /* Analog watch */
    hourA.style.transform = `rotate(0deg)`;
    minA.style.transform = `rotate(0deg)`;
    secA.style.transform = `rotate(0deg)`;
}




function split() {


    let { sphour, spmin, spsec, spmsec } = splitTime;   //object destructuring

    console.log(splitTime);

    if (count === 0) {       //when we click split first time
        spHour = hour;
        spMin = min;
        spSec = sec;
        spMsec = msec;
    }

    else {
        spHour = Math.abs(hour - sphour);
        spMin = Math.abs(min - spmin);
        spSec = Math.abs(sec - spsec);
        spMsec = Math.abs(msec - spmsec);
    }


    count++;

    /* Creating Element */
    let lapsWrapper = document.querySelector(".laps-wrapper");
    let laps = document.createElement("div");
    let serialNo = document.createElement("div");
    let time = document.createElement("div");
    let totalTime = document.createElement("div");

    laps.className = "laps-body"
    serialNo.className = "laps-item"
    time.className = "laps-item"
    totalTime.className = "laps-item"



    /* Setting split values */

    serialNo.innerHTML = count;
    time.innerHTML = `${spHour}: ${spMin}: ${spSec}: ${spMsec}`;
    totalTime.innerHTML = `${hour}: ${min}: ${sec}: ${msec}`;



    splitTime.sphour = hour;          //for storing last split time 
    splitTime.spmin = min;
    splitTime.spsec = sec;
    splitTime.spmsec = msec;





    //appending values in a document
    laps.appendChild(serialNo);
    laps.appendChild(time);
    laps.appendChild(totalTime);
    lapsWrapper.appendChild(laps)


}
