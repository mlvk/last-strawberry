import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';
import EnumModelsMixin from 'last-strawberry/mixins/enum-models-mixin';

const INCLUDES = [
  'client-item-desires',
	'client-item-desires.item',
	'client-visit-days'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, EnumModelsMixin, {
	enumModelNames: ['item'],
	model(){

    return this.store.query('client', {include:INCLUDES.join(',')});

		// return this.store.findAll('client');
	}
});
