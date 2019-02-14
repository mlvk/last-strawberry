import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';

export default Component.extend({
  title: computed("model.name", function() {
    const name = this.get("model.name");
    return `Deleting a price tier: ${name}`;
  }),

  switchingPriceTiers: computed("priceTiers.@each.{id}", function() {
    const priceTiers = this.get("priceTiers");
    const deletingId = this.get("model.id");
    return priceTiers.filter(priceTier => priceTier.get("id") !== deletingId);
  }),

  switchingPriceTier: computed("switchingPriceTiers.[]", function() {
    const switchingPriceTiers = this.get("switchingPriceTiers");
    let switchingPriceTier;
    if(switchingPriceTiers.length !== 0){
      switchingPriceTier = switchingPriceTiers[0];
    }

    return switchingPriceTier;
  }),

  isValid: computed("model.hasCompanies", "switchingPriceTier", function() {
    const hasCompanies = this.get("model.hasCompanies");
    const switchingPriceTier = this.get("switchingPriceTier");
    return isPresent(switchingPriceTier) || !hasCompanies;
  }),

  actions: {
    submitDestroyPriceTier() {
      this.get("submit")(this.get("switchingPriceTier"));
      this.get("close")();
    }
  }
});
