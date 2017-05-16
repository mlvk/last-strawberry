import Ember from "ember";
import computed from "ember-computed-decorators";

const {
  notEmpty
} = Ember.computed;

export default Ember.Component.extend({
  classNames: ["col", "stretch"],

  hasStubAction: notEmpty("stubOrders"),
  hasDuplicateAction: notEmpty("onRequestDuplicateOrders"),
  hasOrders: notEmpty("filterOrders"),

  @computed("includedItems")
  selectedItems(includedItems) {
    const selected = [];

    const itemIdArr = includedItems.split(",");
    itemIdArr.forEach((id) => {
      const item = this.get("items").findBy("id", id);
      if(item){
        selected.push(item);
      }
    });

    return selected;
  },

  @computed("orders.@each.{isDeleted,orderItems,xeroFinancialRecordState,publishedState}", "includeUnpublished", "includePublished", "companyQuery", "selectedItems")
  filterOrders(orders, includeUnpublished, includePublished, query, selectedItems) {
     return orders
       .filter(order => {

         const reg = new RegExp(query, "i"),
               nameMatch = reg.test(order.get("location.company.name")),
               notDeleted = !order.get('isDeleted'),
               notVoided = !order.get('isVoided'),
               showPublished = includePublished && order.get('isPublished'),
               showUnpublished = includeUnpublished && order.get('isUnpublished');

        const includedItem = Ember.isEmpty(selectedItems) ||
          selectedItems.reduce((sum,item) => sum || order.get("orderItems").isAny("item.id", item.get("id")), false);

        return nameMatch && notDeleted && notVoided && (showPublished || showUnpublished) && includedItem;
       });
   },

  @computed("filterOrders")
  groupedOrders(orders) {
    return _
      .chain(orders)
      .sortBy(order => order.get("location.company.name"))
      .groupBy(order => order.get("location.company.name"))
      .value();
  }
});
