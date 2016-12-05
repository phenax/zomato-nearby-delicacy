
import ko from 'knockout';

class Utils {

	// Message box properties
	messageBox= {

		text: ko.observable(''),

		type: ko.observable(''),

		visible: ko.observable(false)
	};

	constructor() {

		this.hideTextBox= this.hideTextBox.bind(this);
		this.showError= this.showError.bind(this);
		this.showInfo= this.showInfo.bind(this);
	}


	networkStatus(timeout) {

		const stackRunner= (stack) => {
			stack.forEach( cb => cb() );
		};

		// Wanted a promise implementation that resolves 
		// everytime its called
		const miniPromise= {

			succCBStack: [],

			errorCBStack: [],

			online(cb) {
				this.succCBStack.push(cb);
				return this;
			},
			offline(cb) {
				this.errorCBStack.push(cb);
				return this;
			}
		};

		const resolve= () => stackRunner(miniPromise.succCBStack);
		const reject= () => stackRunner(miniPromise.errorCBStack);

		setInterval(() => (navigator.onLine)? resolve(): reject(), timeout);

		return Object.freeze(miniPromise);
	}



	// Hides the message box at the bottom
	hideTextBox() {
		this.messageBox.visible(false);
	}

	// Display an error to the user
	showError(message) {

		this.messageBox.type('error');
		this.showMessage(message);
	}

	// Display a message to the user
	showInfo(message) {

		this.messageBox.type('info');
		this.showMessage(message);
	}

	showMessage(message) {

		this.messageBox.text(message);
		this.messageBox.visible(true);
	}

	// Check if the message type is error
	isError() { return this.messageBox.type() === 'error'; }

	// Check if the message type is info
	isInfo() { return this.messageBox.type() === 'info'; }
}

export default new Utils();
