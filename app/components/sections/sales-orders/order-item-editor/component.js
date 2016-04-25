import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['section_sales-order_order-item-editor', 'row'],
  classNameBindings:['highlighted'],

  actions: {
    update(e) {
      this.attrs.update(this.get('model'), e.target.value);
    },

    onFocus() {
      this.set('highlighted', true);
    },

    onBlur() {
      this.set('highlighted', false);
      this.attrs.save(this.get('model'));
    }
  },

  @computed('index')
  formattedIndex(index) {
    const num = S(index + 1).padLeft(2, '0').s;
    return `${num}.`;
  }
});
