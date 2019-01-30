import { inject as service } from '@ember/service';
import Component from '@ember/component';
import CompanyValidations from "last-strawberry/validators/company";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import { computed } from 'ember-decorators/object';

export default Component.extend({
  session:     service(),

  classNames: ["row"],

  validators: CompanyValidations,

  @computed("session")
  codeValidator(session) {
    return UniqueFieldValidator.create({type:"company", key:"location_code_prefix", session});
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get("codeValidator").destroy();
  },

  actions: {
    codeChanged(changeset, e) {
      const newValue = e.target.value;
      changeset.set("locationCodePrefix", newValue);
      this.get("codeValidator").validate(newValue, [this.get("model.locationCodePrefix")]);
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
