import Controller from '@ember/controller';
import { computed } from '@ember/object';
import AddressValidations from "last-strawberry/validators/address";

export default Controller.extend({
  AddressValidations,

  addresses: computed("model.company.activeLocations.@each.{locationHash}", function() {
    const locations = this.get("model.company.activeLocations");
    return locations.map(location => location.get("address"));
  })
});
