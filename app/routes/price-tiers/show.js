import { all } from 'rsvp';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import { updateModelField, saveModelIfDirty } from "last-strawberry/actions/model-actions";
import { PRODUCT } from "last-strawberry/constants/item-types";

const MODEL_INCLUDES = [
  "item-prices",
  "item-prices.item",
  "item-prices.price-tier",
  "item-prices.item.item-prices"
];

export default Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, priceTier) {
    const fulfilledItems = priceTier.get("itemPrices")
      .map(ip => ip.get("item").content);

    const allItems = this.store.peekAll("item")
      .filter(i => i.get("isProduct"))
      .toArray();

    const openItems = _.difference(allItems, fulfilledItems);

    openItems.forEach(item =>
      this.store.createRecord("item-price", {priceTier, item}));

    this._super(controller, priceTier);

    controller.set("priceTiers", this.store.peekAll("price-tier"));
  },

  model(params) {
    return all([
      this.store.query("item", {"filter[tag]":PRODUCT})
    ])
    .then(() => {
      return this.store.findRecord("price-tier", params.id, { reload: true, include:MODEL_INCLUDES.join(",") });
    });
  },

  actions: {
    updateModelField,
    saveModelIfDirty,

    destroyPriceTier(model, switchingPriceTier) {
      model.destroyRecord();

      model.get("companies")
        .forEach(company => {
          company.set("priceTier", switchingPriceTier);
          company.save();
        });

      this.transitionTo("price-tiers");
    }
  }
});
