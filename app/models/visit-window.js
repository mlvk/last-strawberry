import Ember from 'ember';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias } = Ember.computed;

export default Model.extend(LocationHashable, {
	min: 							attr('number', {defaultValue: 480}),
  max: 							attr('number', {defaultValue: 720}),
	service: 					attr('number', {defaultValue: 15}),

	location: 				belongsTo('location'),
	visitWindowDays: 	hasMany('visit-window-day'),

	lat: 							alias('location.address.lat'),
  lng: 							alias('location.address.lng'),

	validForDate(date) {
		const dayOfWeek = moment(date).day();
		return !!this.get('visitWindowDays').find(vwd => vwd.get('day') === dayOfWeek);
	}
});
