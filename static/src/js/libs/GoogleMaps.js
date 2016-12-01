
import mapStyles from './mapStyles';

export default class GoogleMaps {

	API_KEY= 'AIzaSyAjPs0W0u7uHmMEHhJGwZyhTVlEE_5KKso';
	API_URL= 'https://maps.googleapis.com/maps/api/js?key=';

	STYLES= mapStyles;

	markers= [];
	_onLoadStack= [];
	_onErrorStack= [];

	constructor() {

		this.loadMapScript();
	}


	/**
	 * Load the google maps api
	 */
	loadMapScript() {

		const $script= document.createElement('script');
		$script.src= this.API_URL + this.API_KEY;

		$script.onload= () => {
			this._popCallbackStack(this._onLoadStack);
			this.loaded= true;
		};

		$script.onerror= () => {
			this._popCallbackStack(this._onErrorStack);
			this.error= true;
		};

		// Append the script to the dom
		document.body.appendChild($script);
	}


	/**
	 * Pop all callbacks in the callback stack and execute them
	 * 
	 * @param  {Stack} stack  The callback stack
	 */
	_popCallbackStack(stack) {

		let func;

		while((func= stack.pop())) {
			if(typeof func === 'function')
				func();
		}
	}


	/**
	 * Register a callback that will be executed when the script is loaded
	 * 
	 * @return {Promise}            A promise that'll resolve when the google maps api is ready
	 */
	ready() {

		return new Promise((resolve, reject) => {

			const error= new Error('Error while loading scripts. Reload to try again.');

			// If the script is already loaded, resolve it right away
			if(this.loaded) {
				resolve();
			} else if(this.error) {
				reject(error);
			} else {

				this._onErrorStack.push(() => {
					reject(error);
				});

				// Else, register it to the onLoad stack
				this._onLoadStack.push(() => {
					resolve();
				});
			}
		});
	}


	/**
	 * Create a new map
	 * 
	 * @param  {LatLng}   center  Coordinates of the center of the map
	 * @param  {Element}  $hook   The element to attach the map to
	 * @param  {Number}   zoom    The amount of zoom
	 */
	createMap(center, $hook, zoom) {

		this._map= new window.google.maps.Map($hook, {
			center, zoom,
			styles: this.STYLES
		});

		return this;
	}


	addMarker(options) {

		const marker= new window.google.maps.Marker({
			map: this._map,
			clickable: true,
			icon: {
				path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
				fillColor: '#fff',
				fillOpacity: 1,
				strokeColor: '#253691',
				strokeWeight: 2,
				scale: .5,
				labelOrigin: new window.google.maps.Point(0,-25),
			},
			...options
		});

		this.markers.push(marker);

		return marker;
	}


	fitMarkers() {

		const bounds = new window.google.maps.LatLngBounds();

		this.markers.forEach(marker => {
			bounds.extend(marker.getPosition());
		});

		this._map.fitBounds(bounds);
	}


	window(content) {

		return new window.google.maps.InfoWindow({
			content
		});
	}


	hideMarker(index) {
		this.markers[index].setMap(null);
	}

	showMarker(index) {
		this.markers[index].setMap(this._map);
	}



	getCoordinates() {

		return new Promise((resolve, reject) => {

			if ('geolocation' in navigator) {

				navigator.geolocation.getCurrentPosition(
					(position) => {

						resolve(position);
					},
					(e) => {

						reject(e);
					}
				);

			} else {
				reject(new Error('Geolocation Not Supported'));
			}
		});
	}
}