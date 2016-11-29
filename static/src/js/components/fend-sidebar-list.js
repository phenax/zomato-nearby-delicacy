
import ko from 'knockout';

import { SidebarList } from '../viewmodels/Sidebar';

ko.components.register('fend-sidebar-list', {
	viewModel: SidebarList,
	template: `
		<div class='sidebar__list'>
			This is ze list
		</div>
	`
});
