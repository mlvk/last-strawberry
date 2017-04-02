import Ember from "ember";

export default Ember.Service.extend({
  preferencesData:{},
  startUp(){},
  setPreference(key, value){
    this.set(`preferencesData.${key}`, value);
  }
});
