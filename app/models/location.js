import DS from 'ember-data';

export default DS.Model.extend({
  active: DS.attr('boolean'),
  code: DS.attr('string'),
  deliveryRate: DS.attr('number'),
  name: DS.attr('string'),

  address: DS.belongsTo('address'),
  company: DS.belongsTo('company'),

  priceTier: DS.belongsTo('price-tier'),
  itemDesires: DS.hasMany('item-desire'),
  visitDays: DS.hasMany('visit-day'),
  visitWindows: DS.hasMany('visit-window'),
  orders: DS.hasMany('order')
});
