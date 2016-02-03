import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    focusOutHandler () {
      this.attrs.saveSalesOrderItem(this.get('model'));
    }
  }
});
