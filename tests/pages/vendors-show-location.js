import {
  create,
  clickable,
  fillable,
  visitable,
  text,
  hasClass,
  collection } from "ember-cli-page-object";

const page = create({
  visit: visitable("/vendors/:id/locations/:location_id")
});

const visitSchedulePO = create({
  visitWindows: collection({
    itemScope: ".debug_sections_locations_visit-window"
  }),

  createNewVisitWindow: clickable(".createVisitWindow"),
  deleteVisitWindow: clickable(".deleteVisitWindow")
});

const visitDaysPO = create({
  dayOptions: collection({
    itemScope: ".debug_sections_locations_visit-schedule .debug_ui_label-checkbox",

    item: {
      label: text(".label"),
      enabled: hasClass("selected")
    }
  })
});

const addressPO = create({
  scope: ".debug_sections_locations_address-manager",

  fillSearchAddress: fillable("input"),

  updateAddress: clickable(".submit"),

  fullAddress: text(".fullAddress")
});

export {
  page,
  visitSchedulePO,
  visitDaysPO,
  addressPO
};
