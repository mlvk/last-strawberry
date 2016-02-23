import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['section_sales-order_order-item-editor', 'row'],

  actions: {
    update(e) {
      this.attrs.update(this.get('model'), e.target.value);
    }
  }
});
