import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

const { lt } = Ember.computed;

export default Model.extend({
  quantity:   attr('number', { defaultValue: 0 }),

  order:      belongsTo('order'),
  item:       belongsTo('item'),

  empty:      lt('quantity', 1)
});
