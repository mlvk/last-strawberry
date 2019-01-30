import { lt } from '@ember/object/computed';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  quantity:   attr('number', { defaultValue: 0 }),
  unitPrice:  attr('number', { defaultValue: 0 }),

  order:      belongsTo('order'),
  item:       belongsTo('item'),

  empty:      lt('quantity', 1)
});
