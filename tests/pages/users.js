import {
  create,
  collection,
  value,
  text,
  visitable,
  fillable,
  clickable } from "ember-cli-page-object";

export default create({
  visit: visitable("/users"),

  users: collection({
    itemScope: ".debug_sections_users_user-table_table-row",

    item: {
      firstName: value(".firstNameContainer input"),
      lastName: value(".lastNameContainer input"),
      email: value(".emailContainer input"),
      password: value(".passwordContainer input"),
      role: text(".roleContainer .ember-power-select-selected-item"),
      phone: value(".phoneContainer input"),
      delete: clickable(".delete")
    }
  }),

  fillFilterInput: fillable(".filterTermInput")
});
