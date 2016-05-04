import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias } = Ember.computed;

export default Model.extend({
  name:       attr('string'),
  terms:      attr('number', { defaultValue: 14 }),
  tag:        attr('string', { defaultValue: 'customer' }),

  priceTier:  belongsTo('price-tier'),
  locations:  hasMany('location'),

  text:       alias('name'),

  async priceForItem(item) {
    const itemPrices = await this.get('priceTier.itemPrices');

    const itemPrice = itemPrices.find(async itemPrice => await itemPrice.get('item.name') === item.get('name'));
    return itemPrice.get('price')
  }
});
