import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['type', 'checked'],
  type: 'checkbox',
  click () {
    this.attrs.selected(this.get('model'), this.$()[0].checked);
  }
});
