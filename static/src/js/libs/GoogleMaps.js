

export default class GoogleMaps {

	API_KEY= 'AIzaSyAjPs0W0u7uHmMEHhJGwZyhTVlEE_5KKso';

	API_URL= 'https://maps.googleapis.com/maps/api/js?key=';


	constructor() {

		this.markers= [];
		this._onLoadStack= [];

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
			center, zoom
		});

		return self;
	}


	addMarker(position) {

		this.markers.push(

			new window.google.maps.Marker({
				position: position,
				map: this._map
			})
		);
	}


	setMarker(index, position) {

		// TODO: Allow user to change the position 
		if(this.marker[index]) {
			this.marker[index].setPosition(position);
		}
	}


	hideMarker(index) {

		// TODO: Fix this
		if(this.marker[index]) {
			this.marker[index]= null;
		}
	}

	showMarker(index) {

		// TODO: Fix this
		if(!this.marker[index]) {
			this.marker[index]= null;
		}
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