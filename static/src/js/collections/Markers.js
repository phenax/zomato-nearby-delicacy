
import ko from 'knockout';

export class Markers {

	points= ko.observableArray();

	constructor(map) {

		this._map= map;
	}

	addMarker(data) {

		this.points.push(data);

		const marker= this._map.addMarker({
			clickable: true,
			title: data.title,
			position: {
				lat: data.location.latitude*1,
				lng: data.location.longitude*1,
			},
			icon: {
				path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
				fillColor: '#3f51b5',
				fillOpacity: 1,
				strokeColor: '#253691',
				strokeWeight: 2,
				scale: .8,
				labelOrigin: new window.google.maps.Point(0,-25),
			},
		});

		this.addMarkerWindow(data, marker);
	}


	addMarkerWindow(data, marker) {

		const infoWindow= this._map.window(this.getContent(data));

		marker._infoWindow= infoWindow;

		// When you click the marker
		marker.addListener('click', () => {

			// Hide all other infoWindows
			this._map.markers
				.forEach( marker => marker._infoWindow.close());

			// Show this one
			infoWindow.open(this._map._map, marker);
		});
	}

	getContent(data) {

		return `
			<div class='info-window'>
				<div class='info-window__title'>${data.title}</div>
				<div class='info-window__address'>${data.location.address}</div>
				<div class='info-window__ratings' style='color: #${data.ratings.rating_color};'>
					<span class='rating-label'>${data.ratings.rating_text}</span>
					<span class='rating-score'>${data.ratings.aggregate_rating}</span>
				</div>
				<div class='info-window__img'>
					<img src='${data.image}' alt='${data.title}' />
				</div>
				<div class='info-window__menu'>
					<a href='${data.menu}' target='_parent _blank' rel='noopener'>Go To Menu</a>
				</div>
			</div>
		`;
	}


	removeMarker(index) {
		this.points.splice(index, 1);
	}


	hideMarker(index) {
		this._map.hideMarker(index);
	}

	showMarker(index) {
		this._map.showMarker(index);
	}

	fitMarkers() {
		this._map.fitMarkers();
	}
}
