import PO from 'last-strawberry/tests/page-object';

const {
  collection,
  text,
  visitable
} = PO;

const page = PO.create({

  visit: visitable('/sales-orders'),

  orders: collection({
    itemScope: '.debug_navs_orders-nav .child',

    item: {
      label: text('.label')
    }
  }),

  companies: collection({
    itemScope: '.debug_navs_orders-nav .parent',

    item: {
      label: text('.label')
    }
  })

});


export { page };
