import { set } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  async startUp() {
    const data = await localforage.getItem("prefs");
    this.set("preferencesData", data || {});
  },

  async setPreference(key, value){
    const prefs = this.get("preferencesData");
    set(prefs, key, value);
    await localforage.setItem("prefs", prefs);
  }
});
