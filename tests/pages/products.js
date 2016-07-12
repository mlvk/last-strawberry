import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  collection,
  visitable,
  text
} = PO;

const defaultPage = PO.create({
  visit: visitable('/products'),

  products: collection({
    itemScope: '.debug_lists_filterable-label-list a',

    item: {
      label: text(),
      click: clickable()
    }
  })
});

const showPage = PO.create({
  visit: visitable('/products/:id')
});

export { defaultPage, showPage };
