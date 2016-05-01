import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['section_sales-order_order-item-editor', 'row'],
  classNameBindings:['highlighted'],

  _blur() {
    this.set('highlighted', false);
    this.attrs.save(this.get('model'));
  },

  actions: {
    update(e) {
      this.attrs.update(this.get('model'), 'quantity', e.target.value);
    },

    updateUnitPrice(e) {
      const newVal = e.target.value || 0;
      this.attrs.update(this.get('model'), 'unitPrice', newVal);
    },

    onFocus() {
      this.set('highlighted', true);
      this.attrs.onOrderItemChange(this.get('model.item'));
    },

    onBlur() {
      this._blur();
      // this.attrs.onOrderItemChange(undefined);
    },

    onBlurUnitPrice() {
      this.set('editingUnitPrice', false);
      this._blur();
    },

    toggleUnitPriceEditing() {
      this.set('editingUnitPrice', true);
    }
  },

  @computed('index')
  formattedIndex(index) {
    const num = S(index + 1).padLeft(2, '0').s;
    return `${num}.`;
  }
});
