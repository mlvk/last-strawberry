import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  collection,
  // fillable,
  text,
  visitable
} = PO;

const page = PO.create({
  visit: visitable('/sales-orders/:id')
});

const orderEditorPO = PO.create({
  scope: '.debug_ui_order-editor',
  locationName: text('.locationInfo'),
  salesOrderItems: collection({
    itemScope: '.debug_ui_order-editor_order-item-editor',

    item: {
      name: text('.name'),
      quantity: text('.quantity')
    }
  }),

  deleteOrder: clickable('.toolbar .delete')
});

export { page, orderEditorPO };
