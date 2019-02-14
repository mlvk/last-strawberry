import { alias } from '@ember/object/computed';
import LocationHashable from "last-strawberry/mixins/location-hashable";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import {
  belongsTo,
  hasMany
} from "ember-data/relationships";
import { computed } from '@ember/object';

export default Model.extend(LocationHashable, {
  name:                 attr("string"),
  deliveryRate:         attr("number",  { defaultValue: 0 }),
  active:               attr("boolean", { defaultValue: true }),
  code:                 attr("string"),
  note:                 attr("string"),
  deliveryNote:         attr("string"),

  address:              belongsTo("address"),
  company:              belongsTo("company"),
  itemDesires:          hasMany("item-desire"),
  itemCreditRates:      hasMany("item-credit-rate"),
  orders:               hasMany("order"),
  orderTemplates:       hasMany("order-template"),
  visitDays:            hasMany("visit-day"),
  notificationRules:    hasMany("notification-rule"),

  visitWindows:         alias("address.visitWindows"),
  lat:                  alias("address.lat"),
  lng:                  alias("address.lng"),

  isCustomer:           alias("company.isCustomer"),
  isVendor:             alias("company.isVendor"),

  label: computed("name", "id", "company.name", function() {
    const name = this.get("name");
    const id = this.get("id");
    const companyName = this.get("company.name");
    return `${companyName} - ${name} - ${id}`
  })
});
