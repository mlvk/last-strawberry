import Ember from 'ember';
import downloadFile from 'last-strawberry/utils/download-file';

export default Ember.Component.extend({
  classNames: ['section_sales-order_order-editor', 'col'],
  pdfGenerator: Ember.inject.service(),

  actions: {
    printOrder () {
      return this.get('pdfGenerator')
        .generateInvoices([this.get('model')])
        .then(pdfData => downloadFile(pdfData.url, `${this.get('model.orderNumber')}.pdf`))
        .catch(err => err);
    },
  }
});
