import DS from 'ember-data';

export default DS.Model.extend({
  code: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  position: DS.attr('number'),
  salesOrderItems: DS.hasMany('sales-order-item'),
  clientItemDesires: DS.hasMany('client-item-desire'),
  itemPrice: DS.hasMany('item-price')
});
