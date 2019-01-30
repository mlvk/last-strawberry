import Component from '@ember/component';
import CustomerValidations from "last-strawberry/validators/customer";

export default Component.extend({
  classNames: ["col"],

  validators: CustomerValidations,

  actions: {
    onRequestNewCustomer() {
      this.set("stashedNewCustomerData", {});
      this.set("showNewCustomerModal", true);
    },

    closeNewCustomer() {
      this.set("showNewCustomerModal", false);
    },

    createNewCustomer(changeset){
      this.get("createNewCustomer")(changeset);
      this.set("showNewCustomerModal", false);
    }
  }
});
