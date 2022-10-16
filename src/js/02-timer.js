import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const selector = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

let deadLine = null;
let intervalId = null;
// btnStart.disabled = true;
btnStart.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // minDate:  new Date(),
  onClose(selectedDates) {
    const currentTime = new Date();
    deadLine = selectedDates[0];

    if (deadLine < currentTime) {
      return Notify.failure('Please choose a date in the future', {
        position: 'center-center',
        backOverlay: true,
        clickToClose: true,
        closeButton: true,
      });
    } else {
      btnStart.removeAttribute('disabled');
    }

    btnStart.addEventListener('click', onBtnStartClick, { once: true });
  },
};

function onBtnStartClick() {
  Notify.success('Start timer!');
  btnStart.setAttribute('disabled', 'disabled');
  selector.setAttribute('disabled', 'disabled');
  intervalId = setInterval(convertMs, 1000);
}
flatpickr(selector, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(diff) {
  const currentTime = new Date();
  diff = deadLine - currentTime;
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(diff / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((diff % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((diff % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((diff % day) % hour) % minute) / second)
  );
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;

  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    clearInterval(intervalId);
    btnStart.removeAttribute('disabled');
    selector.removeAttribute('disabled');
  }
  return { days, hours, minutes, seconds };
}
