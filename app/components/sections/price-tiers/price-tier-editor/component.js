import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  openItemPrices: computed("model.itemPrices.@each.{isPending}", function() {
    const itemPrices = this.get("model.itemPrices") || [];
    return itemPrices.filter(ip => ip.get("isPending"));
  }),

  fulfilledItemPrices: computed("model.itemPrices.@each.{isActive}", function() {
    const itemPrices = this.get("model.itemPrices") || [];
    return itemPrices.filter(ip => ip.get("isActive"));
  }),

  actions: {
    onRequestDestroyPriceTier() {
      this.set("showDestroyPriceTierModal", true);
    },

    closeDestroyPriceTier() {
      this.set("showDestroyPriceTierModal", false);
    },

    destroyPriceTier(switchingPriceTier){
      this.get("destroyPriceTier")(this.get("model"), switchingPriceTier);
      this.set("showDestroyPriceTierModal", false);
    }
  }
});
