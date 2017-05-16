import DS from 'ember-data';
import { belongsTo, hasMany } from 'ember-data/relationships';
const { attr } = DS;

export default DS.Model.extend({
  location:           belongsTo('location'),

  orderTemplateItems: hasMany('order-template-item'),
  orderTemplateDays:  hasMany('order-template-day'),

  startDate:          attr("string"),
  frequency:          attr('number', {defaultValue: 1})
});
