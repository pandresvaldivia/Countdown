import {
	$date,
	$modal,
	$days,
	$hours,
	$minutes,
	$seconds,
	$countdown,
} from './selectors.js';

function getTimeGap() {
	const targetDate = new Date(`${$date.value}T00:00:00`).getTime();
	const currentDate = new Date().getTime();
	const timeGap = targetDate - currentDate;

	return timeGap > 0 ? timeGap : false;
}

function validateDate(e) {
	e.preventDefault();
	const timeGap = getTimeGap();
	if (timeGap) {
		$modal.style.display = 'none';
		$countdown.style.display = 'flex';
		printTime(timeGap);
	} else {
		printMessage('Ingrese una fecha válida');
	}
}

function formatTime(timeGap) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	return {
		days: Math.floor(timeGap / day).toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false,
		}),
		hours: Math.floor((timeGap % day) / hour).toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false,
		}),
		minutes: Math.floor((timeGap % hour) / minute).toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false,
		}),
		seconds: Math.floor((timeGap % minute) / second).toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false,
		}),
	};
}

function printTime() {
	setInterval(() => {
		const { seconds, minutes, hours, days } = formatTime(getTimeGap());

		$seconds.innerText = seconds;
		$minutes.innerText = minutes;
		$hours.innerText = hours;
		$days.innerText = days;
	}, 1000);
}

function printMessage(message) {
	if (!document.querySelector('.modal-message')) {
		const messageContainer = document.createElement('div');
		messageContainer.classList.add('modal-message');
		messageContainer.innerHTML = `
			<p>${message}</p>
		`;

		$modal.appendChild(messageContainer);

		setTimeout(() => {
			messageContainer.remove();
		}, 1500);
	}
}

export { validateDate };
