import Controller from '@ember/controller';
import { computed } from 'ember-decorators/object';
import AddressValidations from "last-strawberry/validators/address";

export default Controller.extend({
  AddressValidations,

  @computed("model.company.activeLocations.@each.{locationHash}")
  addresses(locations) {
    return locations.map(location => location.get("address"));
  }
});
