
import ko from 'knockout';

import Utils from './libs/Utils';
import ZomatoAPI from './libs/ApiHandler';
import GoogleMaps from './libs/GoogleMaps';

import { Markers } from './collections/Markers';

// All components
import './components/fend-sidebar';
import './components/fend-sidebar-list';


/**
 * The root viewmodel for the application
 */
class RootViewModel {

	// The title for the app
	title= 'Nearby Restaurants';

	// The loading state of the UI(Loading spinner visibility)
	loading= ko.observable(true);

	// The input field search text
	searchText= ko.observable('');

	// The markers that will be rendered to the screen
	filteredMarkers= ko.observableArray();

	constructor() {

		// Subscribe to change in the search text
		this.searchText
			.subscribe( value => this.onInputChange(value) );

		// Initialize the map wrapper
		this.map= new GoogleMaps();

		// Initialize the markers wrapper
		this.markers= new Markers(this.map);

		// When the map is ready
		this.map.ready()
			.then(() => this.map.getCoordinates())        // Get users coordinates
			.then(coord => this._initializeMap(coord))    // Initialize the map and zomato api
			.then(rest => this._renderRestaurants(rest))  // Get the data from the api
			.then(() => {                                 // Final setup

				// Get the filtered list to be all markers
				this.onInputChange('');

				// Stop the loading spinner
				this.loading(false);
			})
			.catch( e => {

				// If there was an error, display the error message to the user
				Utils.error(e.message);
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
			Utils.error('An Error occured. Try reloading the page.');

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
			this.markers.points()
				.filter(
					marker => 
						marker.title.toLowerCase().indexOf(text.toLowerCase()) !== -1
				)
		);
	}
}

// The usuals
ko.applyBindings(new RootViewModel());
