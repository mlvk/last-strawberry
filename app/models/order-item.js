import Em from 'ember';
import DS from 'ember-data';

const { computed: { lt } } = Em;

export default DS.Model.extend({
  order: DS.belongsTo('order'),
  item: DS.belongsTo('item'),
  quantity: DS.attr('number', {defaultValue: 0}),

  empty: lt('quantity', 1)
});
