import { alias } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  preferencesService: service(),

  isClosedDynamicComputed: computed("preferencesService", "settingsKey", function() {
    return EmberObject.extend({
         value: alias(`preferencesService.preferencesData.${this.get("settingsKey")}`)
    }).create({preferencesService: this.get("preferencesService")});
  }),

  isClosed: alias("isClosedDynamicComputed.value"),

  actions: {
    toggle() {
      this.get("preferencesService").setPreference(this.get("settingsKey"), !this.get("isClosed"));
    }
  }
});
