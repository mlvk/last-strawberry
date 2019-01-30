import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  companyName: alias("model.address.locations.firstObject.company.name"),

  init() {
    this._super(...arguments);

    this.defaultIcon = new L.Icon.Default()
  }
});
