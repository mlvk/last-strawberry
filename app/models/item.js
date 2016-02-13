import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  position: DS.attr('number'),
  orderItems: DS.hasMany('order-item'),
  itemDesires: DS.hasMany('item-desire'),
  itemPrice: DS.hasMany('item-price')
});
