import Ember from 'ember';
import guid from 'last-strawberry/utils/guid';

export default Ember.Component.extend({
  attributeBindings: ['containerId:data-drop-zone-id'],
  classNames: ['col', 'stretch'],

  didInsertElement () {
    this._super();
    this.set('containerId', guid());

    if(this.attrs.registerContainer) {
      this.attrs.registerContainer(this.element);
    }

    if(this.attrs.registerId) {
      this.attrs.registerId(this.get('containerId'));
    }
  }
});
