import Ember from 'ember';
import guid from 'last-strawberry/utils/guid';

export default Ember.Component.extend({
  attributeBindings: ['containerId:data-drop-zone-id'],
  classNames: ['col', 'stretch'],
  classNameBindings: ['disableDrop'],


  // init() {
  //   this._super(...arguments)
  //
  // },

  didInsertElement () {
    this.set('containerId', guid());

    if(this.get("registerContainer")) {
      this.get("registerContainer")(this.element);
    }

    if(this.get("registerId")) {
      this.get("registerId")(this.get('containerId'));
    }
  }
});
