
import ko from 'knockout';

import Utils from '../libs/Utils';
import ZomatoAPI from '../libs/ApiHandler';
import GoogleMaps from '../libs/GoogleMaps';

import { Markers } from '../collections/Markers';


/**
 * The root viewmodel for the application
 */
export default class RootViewModel {

	// The title for the app
	title= 'Nearby Restaurants';

	// The loading state of the UI(Loading spinner visibility)
	loading= ko.observable(true);

	// The input field search text
	searchText= ko.observable('');

	// The markers that will be rendered to the screen
	filteredMarkers= ko.observableArray();

	// Initialize the map wrapper
	map= new GoogleMaps();

	// Initialize the markers wrapper
	markers= new Markers(this.map);

	// Logging utilities
	util= Utils;


	constructor() {

		// Subscribe to change in the search text
		this.searchText
			.subscribe( value => this.onInputChange(value) );

		let currentNetworkState= false; 

		Utils
			.networkStatus(1000)
			.online(() => {
				if(!currentNetworkState) {
					Utils.hideTextBox();
					currentNetworkState= true;
				}
			})
			.offline(() => {
				if(currentNetworkState) {
					Utils.showError('You are not connected to the internet');
					currentNetworkState= false;
				}
			});

		// When the map is ready
		this.map
			.ready()
			.then(()    => this.map.getCoordinates())        // Get users coordinates
			.then(coord => this._initializeMap(coord))       // Initialize the map and zomato api
			.then(rest  => this._renderRestaurants(rest))    // Get the data from the api
			.then(()    => {                                 // Final setup

				// Get the filtered list to be all markers
				this.onInputChange('');

				// Stop the loading spinner
				this.loading(false);
			})
			.catch( e => {

				// If there was an error, display the error message to the user
				Utils.showError(e.message);
			});
	}


	// Initializes the map and the zomato api
	_initializeMap(coord) {

		// Zomato api wrapper
		const zomato= new ZomatoAPI();

		// The DOM Node to display the map in
		let $hook= document.getElementById('fendMap');

		// Not necessary, just a precaution
		if($hook === null)
			Utils.showError('An Error occured. Try reloading the page.');

		// The center for the map should be the coordinates of the client
		const center= {
			lat: coord.coords.latitude,
			lng: coord.coords.longitude
		};

		// Create a map with the GoogleMaps wrapper
		this.map.createMap(center, $hook, 16);

		// Send a request to the api(Returns a promise)
		return zomato.send(center, 1000);
	}


	// Add restaurant markers to the map
	_renderRestaurants(data) {

		console.log(data);

		if(!data || !data.restaurants)
			throw new Error('Failed to fetch restaurant data from zomato api. Please try again later');

		// Can optimize this but dont wanna ruin readability with a micro-optimization
		data.restaurants
			.map( data => data.restaurant )          // Only the field restaurant is required
			.map( restaurant => ({                   // Only the following fields in restaurant required
				title: restaurant.name,
				location: restaurant.location,
				menu: restaurant.menu_url,
				ratings: restaurant.user_rating,
				image: restaurant.thumb,
			}))
			.forEach(restaurant => this.markers.addMarker(restaurant));


		// Fit all markers to the screen
		this.markers.fitMarkers();
	}


	// Triggered whenever the search input field changes value
	onInputChange(text) {

		this.filteredMarkers(
			this.markers.points
				.filter(
					(point, i) => {

						const isAMatch= point.title.toLowerCase().indexOf(text.toLowerCase()) !== -1;

						const _marker= this.markers.getMarker(i);

						if(isAMatch) {
							if(!_marker.isVisible)
								this.markers.showMarker(i);
						} else {
							if(_marker.isVisible)
								this.markers.hideMarker(i);
						}

						return isAMatch;
					}
				)
		);
	}


	listClickHandler(index) {

		const realIndex= this.markers.points.indexOf(this.filteredMarkers()[index]);

		this.markers.markerClickHandler(this.map.markers[realIndex]);
	}
}