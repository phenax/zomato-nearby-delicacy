
import ko from 'knockout';

import GoogleMaps from './libs/GoogleMaps';

import Utils from './libs/Utils';

// All components
// import './components/fend-map';
import './components/fend-sidebar';
import './components/fend-sidebar-list';


class RootViewModel {

	title= 'Nearby Restaurants';

	loading= ko.observable(true);

	searchText= ko.observable('fooo');

	constructor() {

		this.onKeyPress= this.onKeyPress.bind(this);

		this.map= new GoogleMaps();

		this.map.ready(() => {

			this.map
				.getCoordinates()
				.then((coord) => {
					this._mapInit(coord);
				})
				.catch((e) => {
					Utils.error(e);
				});
		});
	}


	_mapInit(coord) {

		let $hook= document.getElementById('fendMap');

		if($hook === null) {
			Utils.error('An Error occured. Try reloading the page.');
		}

		const center= {
			lat: coord.coords.latitude,
			lng: coord.coords.longitude
		};

		this.map.createMap(center, $hook, 10);

		this.loading(false);
	}


	onKeyPress(e) {

		// console.log(e);

		// this.searchText('awesome');
	}
}


ko.applyBindings(new RootViewModel());
