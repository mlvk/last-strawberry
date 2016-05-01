import Ember from 'ember';
import config from '../config/environment';

const { isPresent } = Ember;

export default Ember.Service.extend({
  session: Ember.inject.service(),

  generateInvoices(orders = []) {
    const orderNumbers = orders.map(order => order.get('orderNumber'));

    if(isPresent(orderNumbers)) {
      return new Promise((res, rej) => {
        this.get('session').authorize('authorizer:devise', (headerName, headerValue) => {
          const headers = {};
          headers[headerName] = headerValue;
          const payload = {
            url:`${config.apiHost}/orders/generate_pdf`,
            data:{orders:orderNumbers},
            headers,
            type:'POST'
          };

          Ember.$.ajax(payload)
            .done(res)
            .fail(rej)
        });
      });
    } else {
      return Ember.RSVP.reject('No invoices were supplied');
    }

  }
});
