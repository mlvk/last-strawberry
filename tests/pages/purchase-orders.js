import {
  create,
  visitable,
  isVisible } from "ember-cli-page-object";

const page = create({
  visit: visitable("/purchase-orders"),

  bannerIsVisible: isVisible(".debug_ui_alert-banner")
});


export { page };
