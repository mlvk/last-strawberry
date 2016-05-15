import Ember from 'ember';
import computed from 'ember-computed-decorators';
import downloadFile from 'last-strawberry/utils/download-file';

export default Ember.Controller.extend({
  store:          Ember.inject.service(),
  pdfGenerator:   Ember.inject.service(),

  queryParams:    ['date'],
  date:           moment().add(1, 'days').format('YYYY-MM-DD'),

  @computed('routePlans.@each.{date}', 'date')
  activeRoutePlans(routePlans, date) {
    return routePlans.filter(rp => rp.get('date') === date);
  },

  actions: {
    printFulfillmentDocuments() {
      return this.get('pdfGenerator')
        .printFulfillmentDocuments(this.get('activeRoutePlans'))
        .then(pdfData => downloadFile(pdfData.url, `ya.pdf`))
        .catch(err => err);
    },

    onDateSelected(date) {
      this.set('date', moment(date).format('YYYY-MM-DD'));
    }

  }
});
