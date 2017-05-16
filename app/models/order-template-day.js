import { belongsTo } from 'ember-data/relationships';
import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  orderTemplate:  belongsTo('order-template'),

  day:            attr('number'),
  enabled:        attr('boolean')
});
