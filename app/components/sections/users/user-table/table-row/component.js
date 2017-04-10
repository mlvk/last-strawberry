import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  SUPER_ADMIN_ID: "1",

  classNames: "row",

  @computed("session")
  emailValidator(session) {
    return UniqueFieldValidator.create({type:"user", key:"email", session});
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get("emailValidator").destroy();
  },

  checkAndSaveUser(changeset){
    if(changeset.get("isValid") && changeset.get("isDirty") && this.get("emailValidator.isValid")){
      this.get("saveUser")(changeset);
    }
  },

  actions: {
    roleChanged(changeset, role){
      changeset.set("role", role);
      this.checkAndSaveUser(changeset);
    },

    fieldChanged(changeset, field, value) {
      changeset.set(field, value);
    },

    emailChanged(changeset, newValue) {
      changeset.set("email", newValue);
      this.get("emailValidator").validate(newValue, [this.get("model.email")]);
    },

    saveUser(changeset) {
      this.checkAndSaveUser(changeset);
    }
  }
});
