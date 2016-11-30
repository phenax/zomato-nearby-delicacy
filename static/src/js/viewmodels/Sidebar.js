
import ko from 'knockout';

export class Sidebar {

	isVisible= ko.observable(true);

	openMenu() {
		this.isVisible(true);
	}

	closeMenu() {
		this.isVisible(false);
	}
}


export class SidebarList {}
