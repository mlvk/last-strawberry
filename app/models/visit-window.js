import { alias } from '@ember/object/computed';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

import { computed } from '@ember/object';

const toTime = val => {
	const hours = Math.floor(val/60);
	const minutes = val%60;
	return `${hours}:${minutes}`;
};

export default Model.extend(LocationHashable, {
	min: 							attr('number', {defaultValue: 480}),
  max: 							attr('number', {defaultValue: 720}),
	service: 					attr('number', {defaultValue: 15}),

	address:	 				belongsTo('address'),
	visitWindowDays: 	hasMany('visit-window-day'),

	lat: 							alias('location.address.lat'),
  lng: 							alias('location.address.lng'),

  minFormatted: computed("min", function() {
    const val = this.get("min");
		return toTime(val);
  }),

  maxFormatted: computed("max", function() {
    const val = this.get("max");
		return toTime(val);
  }),

	validForDate(date) {
		const dayOfWeek = moment(date).day();
		return !!this.get('visitWindowDays').find(vwd => {
			return vwd.get('day') === dayOfWeek && vwd.get('enabled');
		});
	}
});
