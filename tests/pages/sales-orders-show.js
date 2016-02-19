import PO from 'last-strawberry/tests/page-object';

const {
  // clickable,
  collection,
  // fillable,
  text,
  visitable
} = PO;

const page = PO.create({
  visit: visitable('/sales-orders/:id')
});

const salesOrderPO = PO.create({
  locationName: text('.locationName'),
  salesOrderItems: collection({
    itemScope: '.salesOrderItem',

    item: {
      name: text('.name'),
      quantity: text('.quantity')
    }
  })
});

export { page, salesOrderPO };
