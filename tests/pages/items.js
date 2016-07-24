import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  collection,
  // fillable,
  text,
  visitable
} = PO;

export default PO.create({
  visit: visitable('/items'),

  createNewItem: clickable('.add'),
  // deleteLastRoutePlan: clickable('.debug_sections_distribution_route-plan:last-child .delete'),

  items: collection({
    itemScope: '.debug_sections_items_item-table_table-row',

    item: {
      title: text('.debug_passive_title-bar .span')
    }
  })
});
