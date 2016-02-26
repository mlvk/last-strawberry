import Em from 'ember';
import DS from 'ember-data';

const { computed: { alias } } = Em;

export default DS.Model.extend({
  name: DS.attr('string'),
  code: DS.attr('string'),
  terms: DS.attr('number', {defaultValue:14}),
  creditRate: DS.attr('number', {defaultValue:0}),
  tag: DS.attr('string', {defaultValue:'customer'}),
  priceTier: DS.belongsTo('price-tier'),
  locations: DS.hasMany('location'),
  text: alias('name')
});
