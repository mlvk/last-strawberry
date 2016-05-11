import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { alias, filter, notEmpty } = Ember.computed;

export default Ember.Controller.extend({
  hasDataPath: notEmpty('dataPath'),

  company: alias('model.location.company'),

  filteredItems: filter('items', function(item) {
    return item.get('company.id') === this.get('company.id');
  }),

  @computed('item.name', 'model.location.id')
  dataPath(name, id) {
    if(name) {
      return `locations/${id}/${name}`;
    } else {
      return undefined;
    }
  },

  actions: {
    onOrderItemChange(item) {
      this.set('item', item);
    }
  }
});
