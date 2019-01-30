import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { computed } from 'ember-decorators/object';
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";

export default Component.extend({
  session:     service(),

  @computed("nameValidator.isValid", "changeset.isValid")
  isValid(validName, validChangeset) {
    return validName && validChangeset;
  },

  @computed("session")
  nameValidator(session) {
    return UniqueFieldValidator.create({type:"routePlanBlueprint", key:"name", session});
  },

  didInsertElement() {
    this._super(...arguments);
    this.$(".name").focus();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get("nameValidator").destroy();
  },

  @computed("users.[]")
  drivers(users) {

    const drivers = users.map(u => {
      return {name: u.get("name"), id: u.get("id")};
    });

    // Add blank row
    drivers.unshiftObject({name: "Unselect driver"});
    return drivers;
  },

  actions: {
    setSelectedDriver(driver){
      this.get("changeset").set("user", driver);
    },

    nameChanged(e) {
      const newValue = e.target.value;
      this.get("changeset").set("name", newValue);
      this.get("nameValidator").validate(newValue);
    },

    fieldChanged(field, e) {
      const value = e.target.value;
      this.get("changeset").set(field, value);
    },

    submitForm() {
      const changeset = this.get("changeset");
      changeset.validate();

      if(this.get("isValid")){
        // set user for changeset
        const user = this.get("users").find(u => u.id === changeset.get("user.id"));
        changeset.set("user", user);

        this.get("submit")(changeset);
      }
    }
  }
});
