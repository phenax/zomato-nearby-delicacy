
import ko from 'knockout';

export class Sidebar {

	isVisible= ko.observable(false);

	constructor() {
		// setTimeout(() => { this.isVisible(true); }, 5000);
	}

	openMenu() {
		this.isVisible(true);
	}
}


export class SidebarList {

}
