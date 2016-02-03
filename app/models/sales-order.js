import Em from 'ember';
import DS from 'ember-data';
import OrderBase from 'last-strawberry/models/order';
import computed from 'ember-computed-decorators';

const { computed: { alias }} = Em;

export default OrderBase.extend({
  type: 'sales-order',
  client: DS.belongsTo('client'),
  salesOrderItems: DS.hasMany('sales-order-item'),
  routeVisit: DS.belongsTo('route-visit'),
  deliveryDate: DS.attr('string'),
  invoiced: DS.attr('boolean'),
  voided: DS.attr('boolean'),
  fullfilled: DS.attr('boolean'),
  visitWindow: alias('client.visitWindows.firstObject'),
  name: alias('client.name'),
  company: alias('client.company'),

  @computed('salesOrderItems.@each.{quantity}')
  empty(salesOrderItems) {
    return salesOrderItems.every(so => so.get('empty'));
  }

});
