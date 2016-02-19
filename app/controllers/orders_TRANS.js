import Ember from 'ember';
import computed from 'ember-computed-decorators';
import co from "npm:co";

export default Ember.Controller.extend({
  queryParams: ['deliveryDate', 'clientId'],
  session: Ember.inject.service(),

  @computed('salesOrders.[]', 'deliveryDate')
  requestedSalesOrders (salesOrders) {
    return salesOrders.filter(so => so.get('deliveryDate') === this.get('deliveryDate'));
  },

  @computed('deliveryDate')
  dayOfWeek (deliveryDate) {
    return moment(deliveryDate).day();
  },

  @computed('requestedSalesOrders.[]', 'clients.[]', 'dayOfWeek')
  unhandledClients (salesOrders, clients, day) {
    const allScheduledClients = clients
      .filter(client => client.scheduledForDeliveryOn(day));

    const handledClients = salesOrders
      .map(so => so.get('client'));

    return allScheduledClients
      .filter(client => {
        const match = handledClients.find(c => c.get('code') === client.get('code'));
        return (!match);
      });
  },

  _createSalesOrder (client) {
    const salesOrder = this.store.createRecord('sales-order', {client:client, deliveryDate:this.get('deliveryDate')});
    const store = this.get('store');
    co(function *(){
      (yield client.get('clientItemDesires'))
        .filter(cid => cid.get('desired'))
        .forEach(cid => {
          co(function *(){
            const item = yield cid.get('item');
            store.createRecord('sales-order-item', { item, salesOrder });
          })
        });
    });
  },

  _saveSalesOrderItem (soi) {
    co(function *(){
      const so = yield soi.get('salesOrder');
      yield so.save();
      yield soi.save();
    });
  },

  _generateSalesOrders () {
    this.get('requestedSalesOrders')
      .map(so => {
        so.set('invoiced', true);
        so.save();
      });
  },

  actions: {
    saveSalesOrderItem (soi) {
      this._saveSalesOrderItem(soi);
    },

    createSalesOrder(client) {
			this._createSalesOrder(client);
		},

    stubOrders () {
      const store = this.store;
      const deliveryDate = this.get('deliveryDate');

      this.get('session').authorize('authorizer:devise', (headerName, headerValue) => {
        const headers = {};
        headers[headerName] = headerValue;

        co(function *(){
          const newSalesOrders = yield Ember.$.ajax({
            url:'http://localhost:3000/sales_orders/stub_orders',
            data:{deliveryDate},
            headers,
            type:'POST'
          });

          store.pushPayload(newSalesOrders);
        });
      });
    },

    onDateSelected(date) {
      this.set('deliveryDate', moment(date).format('YYYY-MM-DD'))
    },

    generateSalesOrders() {
      this._generateSalesOrders();
    },

    onSalesOrderSelected(salesOrder) {
      this.setProperties({'currentSalesOrder': salesOrder, 'clientId': salesOrder.get('client.id')});
    },

    onSalesOrderItemSelected(salesOrderItem) {
      this.set('currentSalesOrderItem', salesOrderItem);
    },

    onSalesOrderItemDeselected(salesOrderItem) {
      if(this.get('currentSalesOrderItem', salesOrderItem) === salesOrderItem){
        this.set('currentSalesOrderItem', undefined);
      }

      salesOrderItem
        .save()
        .catch(() => salesOrderItem.rollbackAttributes())
    }
	}
});
