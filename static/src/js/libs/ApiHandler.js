
export default class ApiHandler {

	API_KEY= '4355174366f06b01a4ae777b97d7e70e';

	getUrl(lat, lng, radius) {
		return `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lng}&radius=${radius}`;
	}

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
