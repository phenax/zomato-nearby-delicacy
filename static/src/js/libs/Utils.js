
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

		// Wanted a promise implementation that resolves 
		// everytime its called. So.... mini promise.
		// 
		// Is there another way to do this with a promise-like syntax?
		const network= {

			state: false,

			succCBStack: [],

			errorCBStack: [],

			_stackRunner: (stack) => stack.forEach( cb => cb()),

			online(cb) {
				this.succCBStack.push(cb);
				return this;
			},

			offline(cb) {
				this.errorCBStack.push(cb);
				return this;
			},

			resolve() {
				if(!this.state) {
					this._stackRunner(this.succCBStack);
					this.state= true;
				}
			},
			reject() {
				if(this.state) {
					this._stackRunner(this.errorCBStack);
					this.state= false;
				}
			},
		};

		setInterval(() => (navigator.onLine)? network.resolve(): network.reject(), timeout);

		return network;
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
