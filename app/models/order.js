import Ember from 'ember';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import computed from 'ember-computed-decorators';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { equal, alias } = Ember.computed;

const SALES_ORDER = 'sales-order';
const PURCHASE_ORDER = 'purchase-order';

export default Model.extend(LocationHashable, {
  orderType:        attr('string', {defaultValue: SALES_ORDER}),
  deliveryDate:     attr('string'),

  location:         belongsTo('location'),
  orderItems:       hasMany('order-item'),

  lat:              alias('location.address.lat'),
  lng:              alias('location.address.lng'),

  isSalesOrder:     equal('orderType', SALES_ORDER),
  isPurchaseOrder:  equal('orderType', PURCHASE_ORDER),

  @computed('orderItems.@each.{quantity}')
  empty(orderItems) {
    return orderItems.every(so => so.get('empty'));
  }
});
