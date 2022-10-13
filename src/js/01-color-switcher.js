
const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");
const bodyRef = document.querySelector("body");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

let setIntervalId = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);
btnStop.disabled = true;



function onBtnStartClick() {
  btnStart.disabled = true;
  btnStop.disabled = false;
     setIntervalId = setInterval(() => {
        bodyRef.style.backgroundColor = getRandomHexColor();
    }, 1000); 
}

function onBtnStopClick() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(setIntervalId);
};