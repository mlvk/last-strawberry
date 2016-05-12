import Ember from 'ember';
import downloadFile from 'last-strawberry/utils/download-file';
import computed from 'ember-computed-decorators';

const { alias, not, notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames:       ['section_sales-order_order-editor', 'col'],

  pdfGenerator:     Ember.inject.service(),

  // hasMissingItems:  notEmpty('missingItems'),
  company:          alias('model.location.company'),
  isSalesOrder:     alias('model.isSalesOrder'),
  isPurchaseOrder:  not('isSalesOrder'),

  // @computed('model.orderItems.@each.{name}', 'items.@each.{name}')
  // missingItems(orderItems, items) {
  //   return items
  //     .filter(item => !orderItems.any(oi => oi.get('item.name') === item.get('name')));
  // },

  @computed('itemSearchString')
  noMatchesMessage(str) {
    return `Create new item: ${str}`;
  },

  actions: {
    printOrder() {
      return this.get('pdfGenerator')
        .generateInvoices([this.get('model')])
        .then(pdfData => downloadFile(pdfData.url, `${this.get('model.orderNumber')}.pdf`))
        .catch(err => err);
    },

    createOrderItem(item) {
      this.set('customAddItemResult', undefined);
      this.attrs.createOrderItem(item);
    },

    stashItemSearch(str) {
      this.set('itemSearchString', str);
    },

    onItemSearchKeyDown(obj, keyboard) {
      if(keyboard.code === 'Enter' && !obj.highlighted) {
        this.set('showCreateItemModal', true);
      }
    },

    cancelCreateNewItem() {
      this.set('showCreateItemModal', false);
    },

    async requestCreateNewItem(formData) {
      const newItem = await this.attrs.createNewItem(formData);

      this.attrs.createOrderItem(newItem);
      this.set('showCreateItemModal', false);
    }
  }
});
