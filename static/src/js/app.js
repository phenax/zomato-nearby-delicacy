
import ko from 'knockout';

import GoogleMaps from './libs/GoogleMaps';

import Utils from './libs/Utils';

// All components
import './components/fend-sidebar';
import './components/fend-sidebar-list';


class RootViewModel {

	title= 'Nearby Restaurants';

	loading= ko.observable(true);
	searchText= ko.observable('');

	markers= ko.observableArray();
	filteredMarkers= ko.observableArray();

	constructor() {

		this.searchText
			.subscribe( value => this.onKeyPress(value) );

		this.map= new GoogleMaps();

		this.map.ready(() => {

			this.map
				.getCoordinates()
				.then((coord) => {

					this._mapInit(coord);

					this.onKeyPress('');
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

		this.markers.push({
			title: 'Hello world'
		});

		this.markers.push({
			title: 'Asia'
		});
		this.markers.push({
			title: 'New america'
		});
		this.markers.push({
			title: 'India Hindustan'
		});
		this.markers.push({
			title: 'North America'
		});
	}


	onKeyPress(e) {

		this.filteredMarkers(
			this.markers()
				.filter(
					marker => 
						marker.title
							.toLowerCase()
							.includes(e.toLowerCase())
				)
		);
	}
}


ko.applyBindings(new RootViewModel());
