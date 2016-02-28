import DS from 'ember-data';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import Em from 'ember';

const { computed: { alias }} = Em;

export default DS.Model.extend(LocationHashable, {
	min: DS.attr('number', {defaultValue: 480}),
  max: DS.attr('number', {defaultValue: 720}),
	service: DS.attr('number', {defaultValue: 15}),
	location: DS.belongsTo('location'),
	visitWindowDays: DS.hasMany('visit-window-day'),

	lat: alias('location.address.lat'),
  lng: alias('location.address.lng'),

	validForDate(date) {
		const dayOfWeek = moment(date).day();
		return !!this.get('visitWindowDays').find(vwd => vwd.get('day') === dayOfWeek);
	}
});
