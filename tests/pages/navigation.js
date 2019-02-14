import {
  create,
  clickable,
  visitable } from "ember-cli-page-object";

export default create({
  visitIndex: visitable("/"),
  visitOrders: visitable("/sales-orders"),
  clickHomeLink: clickable(".homeLink"),
  clickOrdersItem: clickable(".salesOrders"),
  clickPurchasesItem: clickable(".purchaseOrders"),
  clickDistributionItem: clickable(".distribution"),
  showPopUpMenu: clickable(".trigger"),
  clickProducts: clickable(".products"),
  clickItems: clickable(".items"),
  clickCustomers: clickable(".customers"),
  clickVendors: clickable(".vendors"),
  clickPriceTiers: clickable(".priceTiers"),
  clickRoutePlanBlueprints: clickable(".routePlanBlueprints"),
  clickUsers: clickable(".users")
});
