
import ko from 'knockout';

export class Markers {

	points= ko.observableArray();

	constructor(map) {

		this._map= map;
	}

	addMarker(data) {

		this.points.push(data);

		this._map.addMarker({
			clickable: true,
			label: data.title,
			title: data.title,
			position: {
				lat: data.location.latitude*1,
				lng: data.location.longitude*1,
			}
		});
	}

	removeMarker(index) {
		this.points.splice(index, 1);
	}
}
