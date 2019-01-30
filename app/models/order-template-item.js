import { alias } from '@ember/object/computed';
import { belongsTo } from 'ember-data/relationships';
import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({

  orderTemplate:  belongsTo('order-template'),
  item:           belongsTo('item'),

  quantity:       attr('number', {defaultValue: 0}),

  position:       alias('item.position')
});
