import { inject as service } from '@ember/service';
import Component from '@ember/component';
import ItemValidators from "last-strawberry/validators/item";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import { computed } from '@ember/object';

export default Component.extend({
  session: service(),

  classNames: "row",

  validators: ItemValidators,

  codeValidator: computed("session", function() {
    const session = this.get("session");
    return UniqueFieldValidator.create({type:"item", key:"code", session});
  }),

  willDestroyElement() {
    this._super(...arguments);

    this.get("codeValidator").destroy();
  },

  actions: {
    codeChanged(changeset, newValue) {
      changeset.set("code", newValue);
      this.get("codeValidator").validate(newValue, [this.get("model.code")]);
    },

    updateItemField(changeset, field, value) {
      changeset.set(field, value);
    },

    saveItem(changeset) {
      if(changeset.get("isValid") && changeset.get("isDirty") && this.get("codeValidator.isValid")){
        this.get("saveItem")(changeset);
      }
    }
  }
});
