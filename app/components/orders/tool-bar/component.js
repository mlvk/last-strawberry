import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({

  @computed()
  selectedDeliveryDate: {
    get(deliveryDate) {
      return deliveryDate;
    },

    set(value) {
      this.set('deliveryDate', moment(value).format('YYYY-MM-DD'));
    }
  }
});
