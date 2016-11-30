
import ko from 'knockout';

import { SidebarList } from '../viewmodels/Sidebar';

ko.components.register('fend-sidebar-list', {
	viewModel: SidebarList,
	template: `
		data-bind="event: { keypress: $root.onKeyPress }"
		<input type='text' class='sidebar__input' data-bind="textInput: $root.searchText" />
		<div data-bind="text: $root.searchText"></div>

		<ul class='sidebar__list'>
			<li>
				Woow
			</li>
		</ul>
	`
});
