import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const INCLUDES = [
  'address',
  'item-desires',
  'item-desires.item'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, model);

    controller.set('items', this.store.peekAll('item'));
  },

  model(params){
    return this.store.findRecord('location', params.location_id, {
      adapterOptions: {
        query: {include:INCLUDES.join(',')}
      }
    });
  },

  actions: {
    updateItemDesires(source = []) {
      const itemDesires = this.currentModel.get('itemDesires');
      const locationId = this.currentModel.get('id');
      const create = this.store.createRecord;

      source
        .map(({id, enabled}) => {
          const itemPredicate = itemDesire => itemDesire.get('item.id') === id;
          const match = itemDesires.find(itemPredicate) || create('itemDesire', {itemId:id, locationId});

          match.set('enabled', enabled);
          return match;
        })
        .filter(itemDesire => itemDesire.get('hasDirtyAttributes'))
        .forEach(itemDesire => itemDesire.save());
      
      return this.currentModel.get('itemDesires');
    }
  }
});
