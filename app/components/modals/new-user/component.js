import { inject as service } from '@ember/service';
import Component from '@ember/component';
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import { computed } from '@ember/object';

export default Component.extend({
  session:     service(),

  isValid: computed("emailValidator.isValid", "changeset.isValid", function() {
    const validEmail = this.get("emailValidator.isValid");
    const validChangeset = this.get("changeset.isValid");
    return validEmail && validChangeset;
  }),

  emailValidator: computed("session", function() {
    const session = this.get("session");
    return UniqueFieldValidator.create({type:"user", key:"email", session});
  }),

  willDestroyElement() {
    this._super(...arguments);

    this.get("emailValidator").destroy();
  },

  actions: {
    emailChanged(newValue) {
      this.get("changeset").set("email", newValue);
      this.get("emailValidator").validate(newValue);
    },

    fieldChanged(field, value) {
      const changeset = this.get("changeset");
      changeset.set(field, value);
    },

    submitNewUser() {
      const changeset = this.get("changeset");
      changeset.validate();
      if(this.get("isValid")){
        this.get("submit")(changeset);
      }
    }
  }
});
