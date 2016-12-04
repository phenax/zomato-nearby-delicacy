
import ko from 'knockout';

class Utils {

	messageBox= {

		text: ko.observable(''),

		type: ko.observable(''),

		visible: ko.observable(false)
	};


	constructor() {

		setInterval(() => { console.log(this.messageBox.type()); }, 1000);

		this.hideTextBox= this.hideTextBox.bind(this);
		this.showError= this.showError.bind(this);
		this.showMessage= this.showMessage.bind(this);
	}

	hideTextBox() {
		this.messageBox.visible(false);
	}

	showError(message) {

		this.messageBox.type('error');
		this.messageBox.text(message);

		this.messageBox.visible(true);
	}

	showMessage(message) {

		this.messageBox.type('info');
		this.messageBox.text(message);

		this.messageBox.visible(true);
	}

	isError() { return this.messageBox.type() === 'error'; }
	isInfo() { return this.messageBox.type() === 'info'; }
}

export default new Utils();
