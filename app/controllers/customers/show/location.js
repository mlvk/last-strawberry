import Controller from '@ember/controller';
import { computed } from '@ember/object';
import AddressValidations from "last-strawberry/validators/address";

export default Controller.extend({
  AddressValidations,

  itemSettings: computed("items.@each.{isProduct,active}", "model.{itemDesires.[],itemCreditRates.[]}", function() {
    const items = this.get('items');
    const itemDesires = this.get('model.itemDesires');
    const itemCreditRates = this.get('model.itemCreditRates');
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
  }),

  addresses: computed("model.company.activeLocations.@each.{locationHash}", function() {
    const locations = this.get("model.company.activeLocations");
    return locations.map(location => location.get("address"));
  })
});
