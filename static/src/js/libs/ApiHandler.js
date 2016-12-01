
export default class ApiHandler {

	API_KEY= '4355174366f06b01a4ae777b97d7e70e';

	// Returns a templated url for the api
	getUrl(lat, lng, radius) {
		return `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lng}&radius=${radius}`;
	}

	/**
	 * Send a request to the zomato server and return a Promise
	 * 
	 * @param  {LatLng}  coords  The coordinates of the client
	 * @param  {Number}  radius  The radius of search
	 * 
	 * @return {Promise}         Resolves when it gets a response
	 */
	send(coords, radius) {

		const url= this.getUrl(coords.lat, coords.lng, radius);

		const options= {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'user-key': this.API_KEY
			},
		};

		return fetch(url, options).then( data => data.json() );
	}
}
