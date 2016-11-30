// #Removed: Felt like overkill

import ko from 'knockout';

import { MapVM } from '../viewmodels/MapVM';

ko.components.register('fend-map', {
	viewModel: MapVM,
	template: '<div class="map" id="fendMap"></div>'
});
