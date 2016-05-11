import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name:             attr('string'),
  description:      attr('string'),
  code:             attr('string'),
  position:         attr('number'),
  tag:              attr('string'),
  isPurchased:      attr('boolean'),
  isSold:           attr('boolean'),

  itemDesires:      hasMany('item-desire'),
  itemCreditRates:  hasMany('item-credit-rate'),
  itemPrices:       hasMany('item-price'),
  orderItems:       hasMany('order-item')
});
