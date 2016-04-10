import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model(){
    return this.store.findAll('item');
	},

  actions: {
		createNewItem() {
			this.store.createRecord('item');
		},

		itemFieldChanged(model, field, value) {
			model.set(field, value);
		},

		saveModel(model) {
			model.save();
		}
  }
});
