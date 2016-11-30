
import ko from 'knockout';

import { Sidebar } from '../viewmodels/Sidebar';


const template= `
	<div class='model-wrapper'>
		<div class='sidebar' data-bind="css: { 'sidebar--visible': isVisible }">
			<div class='sidebar__menu'>

				<div class='sidebar__descr'></div>

				<div data-bind='component: "fend-sidebar-list"'></div>
			</div>

			<div
				class='sidebar__blank'
				data-bind="click: closeMenu">
			</div>
		</div>

		<header class='header'>

			<button
				class='header__menubtn fa fa-bars'
				data-bind="click: openMenu">
			</button>

			<div class='header__title' data-bind='text: $root.title || "No Title"'></div>

			<div class='header__loading' data-bind='visible: $root.loading'></div>
		</header>
	</div>
`;




ko.components.register('fend-sidebar', {
	template,
	viewModel: Sidebar,
});
