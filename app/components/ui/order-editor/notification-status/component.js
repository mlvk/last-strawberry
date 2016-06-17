import Ember from 'ember';
import computed from 'ember-computed-decorators';
import { PENDING_UPDATED_NOTIFICATION, AWAITING_NOTIFICATION, NOTIFIED } from 'last-strawberry/models/order';

export default Ember.Component.extend({
  classNameBindings:['status'],

  @computed('status')
  notificationAlert(status) {
    let msg = "Order hasn't been sent yet";

    switch (status) {
      case AWAITING_NOTIFICATION:
        msg = "Order has been sent"
        break;
      case NOTIFIED:
        msg = "Order has been sent"
        break;
      case PENDING_UPDATED_NOTIFICATION:
        msg = "Order changed since last sent"
        break;
    }

    return msg;
  }
});
