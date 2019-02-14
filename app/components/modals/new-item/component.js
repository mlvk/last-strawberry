import { inject as service } from '@ember/service';
import Component from '@ember/component';
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import { computed } from '@ember/object';

export default Component.extend({
  session:     service(),

  classNames: ["col"],

  isValid: computed("codeValidator.isValid", "changeset.isValid", function() {
    const validCode = this.get("codeValidator.isValid");
    const validChangeset = this.get("changeset.isValid");
    return validCode && validChangeset;
  }),

  codeValidator: computed("session", function() {
    const session = this.get("session");
    return UniqueFieldValidator.create({type:"item", key:"code", session});
  }),

  didInsertElement() {
    this._super(...arguments);
    this.$(".body .name").focus();
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get("codeValidator").destroy();
  },

  actions: {
    codeChanged(e) {
      const newValue = e.target.value;
      this.get("changeset").set("code", newValue);
      this.get("codeValidator").validate(newValue);
    },

    fieldChanged(field, e) {
      const value = e.target.value;
      this.get("changeset").set(field, value);
    },

    submitForm() {
      const changeset = this.get("changeset");
      changeset.validate();

      if(this.get("isValid")){
        this.get("submit")(changeset);
      }
    }
  }
});
