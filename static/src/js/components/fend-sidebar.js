
import ko from 'knockout';

import { Sidebar } from '../viewmodels/Sidebar';


const template= `
	<div class='model-wrapper'>
		<div class='sidebar' data-bind="css: { 'sidebar--visible': isVisible }">
			<div class='sidebar__menu'>

				<div class='sidebar__descr'>
					Papier-mache man Shibuya crypto-wonton soup vinyl fluidity. Cyber-apophenia youtube jeans 8-bit office numinous knife long-chain hydrocarbons drugs denim nodal point neon. Franchise math-construct narrative industrial grade urban girl hacker San Francisco knife savant pre-bomb modem drone footage. Cardboard marketing sub-orbital dissident woman industrial grade dome soul-delay. Tiger-team car realism market sensory tanto Legba sub-orbital rain systemic-ware pen rebar Kowloon. 
				</div>

				<fend-sidebar-list></fend-sidebar-list>
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
