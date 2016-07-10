import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController (controller, model) {
    this._super(controller, model);
    controller.set('items', this.store.peekAll('item'));
  },

  model() {
    return this.store.query('item', {'filter[tag]':'product'})
  },

  actions: {
    showProduct(id) {
      this.transitionTo('products.show', id);
    },

    async createNewProduct(name) {
      const item = this.store.createRecord('item', {name, tag:'product'});
      await item.save();
      this.transitionTo('products.show', item);
    }
  }
});
