import Em from 'ember';
import DS from 'ember-data';
// import { lt } from 'ember-computed-decorators';
const { computed: { lt } } = Em;

export default DS.Model.extend({
  salesOrder: DS.belongsTo('sales-order'),
  item: DS.belongsTo('item'),
  quantity: DS.attr('number', {defaultValue: 0}),

  empty: lt('quantity', 1)
});
