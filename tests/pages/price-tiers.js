import PO from 'last-strawberry/tests/page-object';

const {
  collection,
  text,
  value,
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
  name: value('.priceTierName input'),

  openPriceRows: collection({
    itemScope: '.openItemPricesContainer .debug_ui_price-row',

    item: {
      itemName: text('.name'),
      price: text('.price')
    }
  }),

  fulfilledPriceRows: collection({
    itemScope: '.fulfilledItemPricesContainer .debug_ui_price-row',

    item: {
      itemName: text('.name'),
      price: text('.price')
    }
  }),

  priceRows: collection({
    itemScope: '.debug_ui_price-row',

    item: {
      itemName: text('.name'),
      price: text('.price')
    }
  })

});

export { index, show };
