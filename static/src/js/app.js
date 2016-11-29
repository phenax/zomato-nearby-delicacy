
import ko from 'knockout';

import GoogleMaps from './libs/GoogleMaps';

import Utils from './libs/Utils';

// All components
import './components/fend-map';
import './components/fend-sidebar';
import './components/fend-sidebar-list';


class RootViewModel {

	title= 'Nearby Restaurants';

	loading= ko.observable(true);

	constructor() {

		const map= new GoogleMaps();

		map.ready(() => {

			let $hook= document.getElementById('fendMap');

			if($hook === null) {
				Utils.error('An Error occured. Try reloading the page.');
			}

			const center= {
				lat: 40.836852,
				lng: -73.832632
			};

			map.createMap(center, $hook, 5);

			this.loading(false);
		});
	}
}


ko.applyBindings(new RootViewModel());
