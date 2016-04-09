import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  collection,
  // fillable,
  text,
  visitable
} = PO;

export default PO.create({
  visit: visitable('/distribution'),

  createRoutePlan: clickable('.debug_section_distribution_tool-bar .add'),
  deleteLastRoutePlan: clickable('.debug_section_distribution_route-plan:last-child .delete'),

  orderGroups: collection({
    itemScope: '.debug_section_distribution_order-group',

    item: {
      title: text('.debug_passive_title-bar .span')
    }
  }),

  routePlans: collection({
    itemScope: '.debug_section_distribution_route-plan',

    item: {
      title: text('.debug_passive_title-bar .span')
    }
  })
});
