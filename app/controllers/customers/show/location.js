import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object';
import AddressValidations from "last-strawberry/validators/address";

export default Controller.extend({
  AddressValidations,

  @computed("items.@each.{isProduct,active}", "model.{itemDesires.[],itemCreditRates.[]}")
  itemSettings() {
    let items = this.get('items');
    let itemDesires = this.get('model.itemDesires');
    let itemCreditRates = this.get('model.itemCreditRates');
    return items
      .filter(i => i.get("isProduct") && i.get("active"))
      .map(item => {
        const itemDesire = itemDesires.find(itemDesire => itemDesire.get("item.id") === item.get("id"));
        const itemCreditRate = itemCreditRates.find(itemCreditRate => itemCreditRate.get("item.id") === item.get("id"));

        return {
          item,
          itemDesire,
          itemCreditRate
        };
      });
  },

  @computed("model.company.activeLocations.@each.{locationHash}")
  addresses(locations) {
    return locations.map(location => location.get("address"));
  }
});
