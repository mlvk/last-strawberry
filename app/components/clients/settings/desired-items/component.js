import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  @computed('model.clientItemDesires.@each.desired', 'items.[]')
  itemDesireData (desires, items) {
    return items.map(item => {
      const match = this.get('model.clientItemDesires').find(cid => cid.get('item.code') === item.get('code'));
      return {
        item,
        cid:match
      };
    });
  },

  actions : {
    toggled (data, selected) {
      this.attrs.updateClientItemDesire(data, selected);
    }
  }

});
