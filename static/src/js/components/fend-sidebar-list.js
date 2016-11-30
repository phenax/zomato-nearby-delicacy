
import ko from 'knockout';

import { SidebarList } from '../viewmodels/Sidebar';

ko.components.register('fend-sidebar-list', {
	viewModel: SidebarList,
	template: `
		<ul class='sidebar__list'>
			<li>
				Woow
			</li>
		</ul>
	`
});
