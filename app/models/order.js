import {
  not,
  and,
  gt,
  notEmpty,
  alias,
  equal
} from '@ember/object/computed';
import LocationHashable from "last-strawberry/mixins/location-hashable";
import { computed } from '@ember/object';
import Model from "ember-data/model";
import attr from "ember-data/attr";
import {
  belongsTo,
  hasMany
} from "ember-data/relationships";

import PublishedState from "last-strawberry/constants/published-states";
import XeroStates from "last-strawberry/constants/xero-states";
import SyncStates from "last-strawberry/constants/sync-states";

const SALES_ORDER = "sales-order";
const PURCHASE_ORDER = "purchase-order";

export default Model.extend(LocationHashable, {
  orderNumber:                  attr("string"),
  xeroId:                       attr("string"),
  orderType:                    attr("string", {defaultValue: SALES_ORDER}),
  deliveryDate:                 attr("string"),
  shipping:                     attr("number"),
  xeroFinancialRecordState:     attr("string", {defaultValue: XeroStates.DRAFT}),
  syncState:                    attr("string", {defaultValue: SyncStates.PENDING}),
  publishedState:               attr("string", {defaultValue: PublishedState.UNPUBLISHED}),
  internalNote:                 attr("string"),
  comment:                      attr("string"),

  location:                     belongsTo("location"),
  orderItems:                   hasMany("order-item"),
  notifications:                hasMany("notification"),

  lat:                          alias("location.address.lat"),
  lng:                          alias("location.address.lng"),

  isSalesOrder:                 equal("orderType", SALES_ORDER),
  isPurchaseOrder:              equal("orderType", PURCHASE_ORDER),

  isUnpublished:                equal("publishedState", PublishedState.UNPUBLISHED),
  isPublished:                  equal("publishedState", PublishedState.PUBLISHED),

  isSynced:                     equal("syncState", SyncStates.SYNCED),

  isVoided:                     equal("xeroFinancialRecordState", XeroStates.VOIDED),
  isDeleted:                    equal("xeroFinancialRecordState", XeroStates.DELETED),
  notVoided:                    not("isVoided"),
  notDeleted:                   not("isDeleted"),

  hasQuantity:                  gt("totalQuantity", 0),

  hasXeroId:                    notEmpty("xeroId"),

  isValid:                      and("hasQuantity", "notVoided", "notDeleted"),

  notifiable: computed("orderItems.@each.{hasDirtyAttributes}", "hasDirtyAttributes", function() {
    const orderItems = this.get("orderItems");
    return !orderItems.any(oi => oi.get("hasDirtyAttributes")) && !this.get('hasDirtyAttributes');
  }),

  empty: computed("orderItems.@each.{quantity}", function() {
    const orderItems = this.get("orderItems");
    return orderItems.every(oi => oi.get("empty"));
  }),

  totalQuantity: computed("orderItems.@each.{quantity}", function() {
    const orderItems = this.get("orderItems");
    return orderItems.reduce((acc, cur) => acc + Number(cur.get("quantity")), 0);
  }),

  totalPrice: computed("orderItems.@each.{quantity,unitPrice}", "shipping", function() {
    const orderItems = this.get("orderItems");
    const shipping = this.get("shipping");
    const orderItemsTotal = orderItems.reduce((acc, cur) => acc + Number(cur.get("quantity") * cur.get("unitPrice")), 0);
    return orderItemsTotal + shipping;
  })
});
