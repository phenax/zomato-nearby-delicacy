
import mapStyles from './mapStyles';

export default class GoogleMaps {

	API_KEY= 'AIzaSyAjPs0W0u7uHmMEHhJGwZyhTVlEE_5KKso';

	API_URL= 'https://maps.googleapis.com/maps/api/js?key=';

	STYLES= mapStyles;

	constructor() {

		this.markers= [];
		this._onLoadStack= [];

		console.log(Promise);

		this.loadMapScript();
	}

	loadMapScript() {

		const $script= document.createElement('script');
		$script.src= this.API_URL + this.API_KEY;

		$script.onload= () => {

			let func;

			setTimeout(() => {
				
				// Pop all the load stack elems and execute them
				while((func= this._onLoadStack.pop())) {

					if(typeof func === 'function') {
						func(this);
					}
				}
				
				// Script is loaded!
				this.loaded= true;
			}, 0);
		};

		// Append the script to the dom
		document.body.appendChild($script);
	}


	/**
	 * Register a callback that will be executed when the script is loaded
	 * 
	 * @param  {Function} callback  The callback function
	 */
	ready(callback) {

		// If the script has already been loaded, execute the callback directly
		if(this.loaded) {
			requestAnimationFrame(() => callback(this));
			return this;
		}

		// Else, register it to the onLoad stack
		this._onLoadStack.push(callback);

		return this;
	}


	createMap(center, $hook, zoom) {

		this._map= new window.google.maps.Map($hook, {
			center, zoom,
			styles: this.STYLES
		});

		return self;
	}


	addMarker(options) {

		const marker= new window.google.maps.Marker({
			map: this._map,
			clickable: true,
			icon: {
				path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
				fillColor: '#888',
				fillOpacity: 1,
				strokeColor: '#253691',
				strokeWeight: 2,
				scale: .8,
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