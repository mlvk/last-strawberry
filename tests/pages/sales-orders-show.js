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
  locationName: text('.locationInfo'),
  salesOrderItems: collection({
    itemScope: '.salesOrderItem',

    item: {
      name: text('.name'),
      quantity: text('.quantity')
    }
  }),

  deleteOrder: clickable('.section_sales-order_order-editor .delete')
});

export { page, orderEditorPO };
