import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  code: DS.attr('string'),
  terms: DS.attr('number'),
  creditRate: DS.attr('number'),
  tag: DS.attr('string'),
  priceTier: DS.belongsTo('price-tier'),
  locations: DS.hasMany('location')
});
