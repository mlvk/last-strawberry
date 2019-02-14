import { inject as service } from '@ember/service';
import Component from '@ember/component';
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import LocationValidations from "last-strawberry/validators/location";
import { computed } from '@ember/object';

export default Component.extend({
  session:     service(),

  classNames: ["section_location_location-settings", "col"],

  validators: LocationValidations,

  codeValidator: computed("session", function() {
    const session = this.get("session");
    return UniqueFieldValidator.create({type:"location", key:"code", session});
  }),

  willDestroyElement() {
    this._super(...arguments);

    this.get("codeValidator").destroy();
  },

  actions: {
    codeChanged(changeset, e) {
      const newValue = e.target.value;

      changeset.set("code", newValue);
      this.get("codeValidator").validate(newValue, [this.get("model.code")]);
    },

    fieldChanged(changeset, field, e) {
      const value = e.target.value;
      changeset.set(field, value);
    },

    save(changeset){
      if(changeset.get("isValid") && this.get("codeValidator.isValid")){
        this.get("save")(changeset);
      }
    }
  }
});
