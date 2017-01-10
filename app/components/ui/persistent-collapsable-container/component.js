import Ember from "ember";

export default Ember.Component.extend({
  preferencesService: Ember.inject.service(),

  isClosedDynamicComputed: Ember.computed("preferencesService", "settingsKey", function() {
    return Ember.Object.extend({
         value: Ember.computed.alias(`preferencesService.preferencesData.${this.get("settingsKey")}`)
    }).create({preferencesService: this.get("preferencesService")});
  }),

  isClosed: Ember.computed.alias("isClosedDynamicComputed.value"),

  actions: {
    toggle() {
      this.get("preferencesService").setPreference(this.get("settingsKey"), !this.get("isClosed"));
    }
  }
});
