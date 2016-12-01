
import ko from 'knockout';

export class Sidebar {

	// The visibility of the sidebar
	isVisible= ko.observable(false);

	// Opens the sidebar/menu
	openMenu() {
		this.isVisible(true);
	}

	// Closes the sidebar/menu (Duh)
	closeMenu() {
		this.isVisible(false);
	}
}


export class SidebarList {

	/**
	 * When someone clicks on an item in the sidebar
	 * 
	 * @param  {Observable}     $index   The index position observable
	 * @param  {RootViewModel}  $root    The root scope
	 * @param  {Sidebar}        $sidebar The sidebar scope
	 */
	itemClickHandler($index, $root, $sidebar) {

		$sidebar.closeMenu();

		$root.listClickHandler($index());
	}
}
