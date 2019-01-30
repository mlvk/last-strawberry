import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
  active: filterBy("companies", "isActive", true),
  customers: filterBy("active", "isCustomer", true)
});
