import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
const { alias } = Ember.computed;

export default Model.extend({
  name:         attr('string'),
  description:  attr('string'),

  itemPrices:   hasMany('item-price'),

  text: alias('name')
});
