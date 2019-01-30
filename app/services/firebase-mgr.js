import Service from '@ember/service';
import config from 'last-strawberry/config/environment';

export default Service.extend({
  buildRef(path) {
    return this.get('client').child(path);
  },

  init() {
    this._super(...arguments);
    this.client = new Firebase(config.firebase.host);
  }
});
