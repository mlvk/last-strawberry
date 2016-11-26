import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

import activeState from "last-strawberry/constants/active-states";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller) {
    controller.set("companies", this.store.peekAll("company"));
    controller.set("priceTiers", this.store.peekAll("price-tier"));
  },

	model(){
    return Ember.RSVP.all([
      this.store.findAll("item"),
      this.store.findAll("price-tier"),
      this.store.query("company", {"filter[active_state]":activeState.ACTIVE})
    ]);
	},

  actions: {
    showCustomer(id) {
      this.transitionTo("customers.show", id);
    },

    async createNewCustomer(changeset) {
      const insertedData = {
        name: changeset.get("name"),
        locationCodePrefix: changeset.get("locationCodePrefix"),
        terms: changeset.get("terms"),
        priceTier: changeset.get("priceTier")
      };

      const company = this.store.createRecord("company", insertedData);
      await company.save();

      this.transitionTo("customers.show", company);
    }
  }
});
