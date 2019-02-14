import {
  create,
  clickable,
  collection,
  fillable,
  text,
  visitable,
  value } from "ember-cli-page-object";

const index = create({
  visit: visitable("/vendors"),

  fillNewVendor: fillable(".create-new-vendor.ui_input-action-bar input"),
  createNewVendor: clickable(".create-new-vendor.ui_input-action-bar .btn"),

  vendors: collection({
    itemScope: ".list-filterable-label-list .name",

    item: {
      label: text(".name")
    }
  })
});

const show = create({
  visit: visitable("/vendors/:id"),
  name: value('.debug_sections_companies_company-settings .name')
});

export { index, show };
