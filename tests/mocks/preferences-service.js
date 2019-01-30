import Service from '@ember/service';

export default Service.extend({
  startUp(){},
  setPreference(key, value){
    this.set(`preferencesData.${key}`, value);
  },
  init() {
    this._super(...arguments);

    this.preferencesData = {};
  }
});
