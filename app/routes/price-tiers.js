import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.findAll("price-tier");
  },

  actions: {
    showPriceTier(id) {
      this.transitionTo("price-tiers.show", id);
    },

    async createNewPriceTier(name) {
      const priceTier = this.store.createRecord("price-tier", {name});
      await priceTier.save();

      this.transitionTo("price-tiers.show", priceTier.id);
    }
  }
});
