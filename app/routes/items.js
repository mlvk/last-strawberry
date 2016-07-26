import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const MODEL_INCLUDES = [
	'company'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	setupController(controller, model) {
    this._super(controller, model);

		controller.set('items', this.store.peekAll('item'));
		controller.set('companies', this.store.peekAll('company'));
	},

	model(){
		return Ember.RSVP.all([
			this.store.findAll('company'),
			this.store.query('item', {
				'filter[tag]':'ingredient',
				include:MODEL_INCLUDES.join(',')
			})
		]);
	},

  actions: {
		createNewItem() {
			this.store.createRecord('item');
		},

		updateItemField(model, key, value) {
			model.set(key, value);
		},

		saveItem(model) {
			if(model.get('hasDirtyAttributes')) {
				model.save();
			}
		},

		archiveItem(item) {
			item.set('active', false);
			item.save();
		},

		itemFieldChanged(model, field, value) {
			model.set(field, value);
		},

		saveModel(model) {
			model.save();
		}
  }
});
