
import ko from 'knockout';

import { SidebarList } from '../viewmodels/Sidebar';


const template= `

	<div class='sidebar__inp-wrap'>

		<label>

			<input
				type='text'
				class='sidebar__input'
				placeholder='Search...'
				data-bind="textInput: $root.searchText"
			/>

			<div class='sidebar__input--after'></div>

		</label>

	</div>

	<ul
		class='sidebar__list'
		data-bind="foreach: $root.filteredMarkers">

		<li class='sidebar__list__item'>
			<button
				class='sidebar__list__item__btn'
				data-bind="click: function() { $parent.itemClickHandler($index, $root, $parents[1]); }">
				<div data-bind="text: title"></div>
			</button>
		</li>

	</ul>
`;


ko.components.register('fend-sidebar-list', {
	viewModel: SidebarList,
	template
});
