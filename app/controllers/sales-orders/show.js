import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { notEmpty } = Ember.computed;

export default Ember.Controller.extend({

  hasDataPath: notEmpty('dataPath'),

  @computed('item.name', 'model.location.code')
  dataPath(name, code) {
    if(name) {
      return `locations/${code}/${name}`;
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
