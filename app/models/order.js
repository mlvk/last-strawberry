import Em from 'ember';
import DS from 'ember-data';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import computed from 'ember-computed-decorators';

const { computed: { equal, alias }} = Em;

const SALES_ORDER = 'sales-order';
const PURCHASE_ORDER = 'purchase-order';

export default DS.Model.extend(LocationHashable, {
  orderType: DS.attr('string', {defaultValue: SALES_ORDER}),
  location: DS.belongsTo('location'),
  orderItems: DS.hasMany('order-item'),
  deliveryDate: DS.attr('string'),
  lat: alias('location.address.lat'),
  lng: alias('location.address.lng'),

  @computed('orderItems.@each.{quantity}')
  empty(orderItems) {
    return orderItems.every(so => so.get('empty'));
  },

  isSalesOrder: equal('orderType', SALES_ORDER),
  isPurchaseOrder: equal('orderType', PURCHASE_ORDER)
});
