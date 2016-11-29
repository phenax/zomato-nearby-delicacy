
import ko from 'knockout';

import { Sidebar } from '../viewmodels/Sidebar';

ko.components.register('fend-sidebar', {
	viewModel: Sidebar,
	template: `
		<div class='sidebar__wrap'>
			Bookheimekhan

			<fend-sidebar-list></fend-sidebar-list>
		</div>
	`
});
