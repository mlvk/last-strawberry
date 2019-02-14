import { inject as service } from '@ember/service';
import Component from '@ember/component';
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import { computed } from '@ember/object';

export default Component.extend({
  session:     service(),

  codeValidator: computed("session", function() {
    const session = this.get("session");
    return UniqueFieldValidator.create({type:"company", key:"location_code_prefix", session});
  }),

  isValid: computed("codeValidator.isValid", "changeset.isValid", function() {
    const validCode = this.get("codeValidator.isValid");
    const validChangeset = this.get("changeset.isValid");
    return validCode && validChangeset;
  }),

  willDestroyElement() {
    this.get("codeValidator").destroy();
  },

  actions: {
    codeChanged(newValue) {
      this.get("changeset").set("locationCodePrefix", newValue);
      this.get("codeValidator").validate(newValue);
    },

    fieldChanged(field, value) {
      this.get("changeset").set(field, value);
    },

    submitNewCustomer() {
      const changeset = this.get("changeset");
      changeset.validate();
      if(this.get("isValid")){
        this.get("submit")(changeset);
      }
    }
  }
});
