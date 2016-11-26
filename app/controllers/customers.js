import Ember from "ember";

const { filterBy } = Ember.computed;

export default Ember.Controller.extend({
  active: filterBy("companies", "isActive", true),
  customers: filterBy("active", "isCustomer", true)
});
