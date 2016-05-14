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
    // updateQuantity(e) {
    //   const newVal = e.target.value;
    //   this.set('localQuantity', newVal)
    //   this.attrs.update(this.get('model'), 'quantity', newVal);
    // },
    //
    // updatePrice(e) {
    //   const newVal = e.target.value;
    //   this.set('localPrice', newVal);
    //   this.attrs.update(this.get('model'), 'unitPrice', newVal);
    // },

    onFocus() {
      this.set('highlighted', true);
      this.attrs.onOrderItemChange(this.get('model.item'));
    },

    onBlur() {
      if(!this.get('model.quantity')){
        this.set('model.quantity', 0)
      }

      this._blur();
    },

    onBlurUnitPrice() {
      if(!this.get('model.unitPrice')){
        this.set('model.unitPrice', 0)
      }
      
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
