import PO from 'last-strawberry/tests/page-object';

const {
  // clickable,
  collection,
  // fillable,
  text,
  visitable
} = PO;

const page = PO.create({
  visit: visitable('/sales-orders'),

  locations: collection({
    itemScope: '.list_grouped-list .child',

    item: {
      label: text('.label')
    }
  }),

  companies: collection({
    itemScope: '.list_grouped-list .parent',

    item: {
      label: text('.label')
    }
  })
});


export { page };
