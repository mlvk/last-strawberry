import Em from 'ember';
import DS from 'ember-data';
import computed from 'ember-computed-decorators';

export default DS.Model.extend({
	address: DS.attr('string'),
	city: DS.attr('string'),
	state: DS.attr('string'),
	zip: DS.attr('string'),
	lat: DS.attr('number'),
	lon: DS.attr('number'),
	service: DS.attr('number'),
	arriveAt: DS.attr('number'),
  departAt: DS.attr('number'),
	client: DS.belongsTo('client'),
	routeVisits: DS.hasMany('route-visit'),

	locationHash: Em.computed('visitWindow', function(){
    return `~${this.get('lat')}_${this.get('lon')}`;
  }),

	@computed('address', 'city')
	completeAddress(address, city) {
		return `${address}, ${city}`;
	},

	@computed('arriveAt')
	arriveAtFormatted(time) {
		return moment({hour: 0, minute: 0}).minute(time).format("HH:mm");
	},

	@computed('departAt')
	departAtFormatted(time) {
		return moment({hour: 0, minute: 0}).minute(time).format("HH:mm");
	}
});
