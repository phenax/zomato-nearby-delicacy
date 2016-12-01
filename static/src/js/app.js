
import ko from 'knockout';

import Utils from './libs/Utils';
import ZomatoAPI from './libs/ApiHandler';
import GoogleMaps from './libs/GoogleMaps';

import { Markers } from './collections/Markers';

// All components
import './components/fend-sidebar';
import './components/fend-sidebar-list';


class RootViewModel {

	title= 'Nearby Restaurants';

	loading= ko.observable(true);
	searchText= ko.observable('');

	filteredMarkers= ko.observableArray();

	constructor() {

		this.searchText
			.subscribe( value => this.onKeyPress(value) );

		this.map= new GoogleMaps();

		this.markers= new Markers(this.map);

		this.map.ready(() => {

			this.loading(false);

			this.map
				.getCoordinates()
				.then( coord => {

					this._mapInit(coord);

					this.onKeyPress('');
				})
				.catch( e => {
					Utils.error(e.message);
				});
		});
	}

	_mapInit(coord) {

		let $hook= document.getElementById('fendMap');

		if($hook === null)
			Utils.error('An Error occured. Try reloading the page.');

		const center= {
			lat: coord.coords.latitude,
			lng: coord.coords.longitude
		};

		this.map.createMap(center, $hook, 16);

		const zomato= new ZomatoAPI();

		zomato
			.send(center, 1000)
			.then( data => this._apiResults(data))
			.catch( e => {
				Utils.error(e.message);
			});
	}


	_apiResults(data) {

		console.log(data);

		data.restaurants
			.map( rest => rest.restaurant )
			.map( rest => ({
				title: rest.name,
				location: rest.location,
				menu: rest.menu_url,
				ratings: rest.user_rating,
				cost_for_two: rest.currency + rest.average_cost_for_two,
				image: rest.thumb,
			}))
			.forEach( rest => this.markers.addMarker(rest));

		this.markers.fitMarkers();

		this.onKeyPress('');
	}


	onKeyPress(e) {

		this.filteredMarkers(
			this.markers.points()
				.filter(
					marker => 
						marker.title.toLowerCase().indexOf(e.toLowerCase()) !== -1
				)
		);
	}
}


ko.applyBindings(new RootViewModel());
