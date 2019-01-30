import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { notEmpty, not, alias } from '@ember/object/computed';
import downloadFile from "last-strawberry/utils/download-file";
import { computed } from 'ember-decorators/object';
import ItemValidations from "last-strawberry/validators/item";

export default Component.extend({
  classNames:       ["section_sales-order_order-editor", "col"],

  pdfGenerator:     service(),

  company:          alias("model.location.company"),
  isSalesOrder:     alias("model.isSalesOrder"),
  isPurchaseOrder:  not("isSalesOrder"),
  hasUnusedItems:   notEmpty("items"),

  validators: ItemValidations,

  @computed("itemSearchString")
  noMatchesMessage(str = "") {
    return this.get("isPurchaseOrder")? `Create new item: ${str}`: `Item not found: ${str}`;
  },

  @computed("model.orderItems.@each.{isDeleted}")
  validOrderItems(orderItems) {
    return orderItems
      .filter(o => !o.get("isDeleted"))
      .sortBy("item.position");
  },

  actions: {
    async printOrder() {
      const { url, key } = await this.get("pdfGenerator").generateInvoices([this.get("model")]);
      return downloadFile(url, key);
    },

    createOrderItem(item) {
      this.set("customAddItemResult", undefined);
      this.get("createOrderItem")(item);
    },

    stashItemSearch(str) {
      this.set("itemSearchString", str);
    },

    onItemSearchKeyDown(obj, keyboard) {
      if(keyboard.code === "Enter" && this.get("isPurchaseOrder") && !obj.highlighted) {

        const stashedItemData= {
          name: this.get("itemSearchString"),
          company: this.get("company"),
          position: 0
        }

        this.set("stashedItemData", stashedItemData);
        this.set("showCreateItemModal", true);
      }
    },

    cancelCreateNewItem() {
      this.set("showCreateItemModal", false);
    },

    async requestCreateNewItem(changeset) {
      const newItem = await this.get("createNewItem")(changeset);

      this.get("createOrderItem")(newItem);
      this.set("showCreateItemModal", false);
    },

    propChanged(key, e) {
      this.get("model").set(key, e.target.value);
    }
  }
});
