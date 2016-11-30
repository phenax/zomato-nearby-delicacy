let $messageBox= document.querySelector('.js-message-box');

$messageBox.addEventListener('click', () => {
	Utils.hide();
});

export default class Utils {

	static hide() {

		$messageBox.classList.remove('error');
		$messageBox.classList.remove('info');

		$messageBox.classList.remove('show');
	}

	static delayHide(time) {

		setTimeout(() => Utils.hide(), time);
	}

	static error(message) {

		if(!$messageBox)
			console.error(message);

		$messageBox.textContent= message;
		$messageBox.classList.add('error');
		$messageBox.classList.add('show');
	}

	static message(message) {

		if(!$messageBox)
			console.log(message);

		$messageBox.textContent= message;
		$messageBox.classList.add('info');
		$messageBox.classList.add('show');

		// delayHide(5000);
	}
}