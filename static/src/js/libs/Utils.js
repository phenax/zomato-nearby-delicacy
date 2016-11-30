let $messageBox= document.querySelector('.js-message-box');

export default class Utils {

	static alert(color, message) {
		console.log(color);
		console.log(message);
	}

	static error(message) {
		console.error(message);
		console.log($messageBox);
	}

	static message(message) {
		console.log(message);
	}
}