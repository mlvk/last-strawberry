import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  collection,
  visitable,
  text
} = PO;

export default PO.create({
  visit: visitable('/products'),

  products: collection({
    itemScope: '.debug_lists_filterable-label-list a',

    item: {
      label: text(),
      click: clickable()
    }
  })
});
