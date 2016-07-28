import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  @computed('model.itemPrices.@each.{isNew}')
  openItemPrices(itemPrices = []) {
    return itemPrices.filter(ip => ip.get('isNew'));
  },

  @computed('model.itemPrices.@each.{isNew}')
  fulfilledItemPrices(itemPrices = []) {
    return itemPrices.filter(ip => !ip.get('isNew'));
  }
});
