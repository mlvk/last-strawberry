import {
  create,
  visitable,
  count,
  value } from "ember-cli-page-object";

export default create({
  visit: visitable("/vendors/:id"),

  locationCount: count(".location"),

  name: value('.debug_sections_companies_company-settings .name')
});
