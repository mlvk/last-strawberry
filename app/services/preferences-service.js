import Ember from "ember";

export default Ember.Service.extend({
  async startUp() {
    const data = await localforage.getItem("prefs");
    this.set("preferencesData", data || {});
  },

  async setPreference(key, value){
    const prefs = this.get("preferencesData");
    Ember.set(prefs, key, value);
    await localforage.setItem("prefs", prefs);
  }
});
