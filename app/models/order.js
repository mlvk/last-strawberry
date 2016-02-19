import Em from 'ember';
import DS from 'ember-data';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import computed from 'ember-computed-decorators';

const { computed: { equal }} = Em;

const SALES_ORDER = 'sales-order';
const PURCHASE_ORDER = 'purchase-order';

export default DS.Model.extend(LocationHashable, {
  orderType: DS.attr('string', {defaultValue: SALES_ORDER}),
  location: DS.belongsTo('location'),
  orderItems: DS.hasMany('order-item'),
  routeVisit: DS.belongsTo('route-visit'),
  deliveryDate: DS.attr('string'),
  // sent: DS.attr('boolean'),
  // voided: DS.attr('boolean'),
  // fullfilled: DS.attr('boolean'),
  // visitWindow: alias('location.visitWindows.firstObject'),
  // name: alias('location.name'),
  // company: alias('location.company.name'),


  @computed('orderItems.@each.{quantity}')
  empty(orderItems) {
    return orderItems.every(so => so.get('empty'));
  },

  isSalesOrder: equal('orderType', SALES_ORDER),
  isPurchaseOrder: equal('orderType', PURCHASE_ORDER)
});
