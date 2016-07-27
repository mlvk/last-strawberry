import PO from 'last-strawberry/tests/page-object';

const {
  collection,
  text,
  visitable
} = PO;

const index = PO.create({
  visit: visitable('/price-tiers'),

  priceTiers: collection({

    itemScope: '.debug_lists_filterable-label-list a',

    item: {
      label: text('.name')
    }
  })
});


const show = PO.create({
  scope: '.priceTierContainer',
  visit: visitable('/price-tiers/:id'),
  name: text('.name')
});


export { index, show };
