import DS from 'ember-data';

export default DS.Model.extend({
	min: DS.attr('number', {defaultValue: 480}),
  max: DS.attr('number', {defaultValue: 720}),
	service: DS.attr('number', {defaultValue: 15}),

	location: DS.belongsTo('location'),
	visitWindowDays: DS.hasMany('visit-window-day')
});
