import PO from 'last-strawberry/tests/page-object';

const { visitable, count } = PO;

export default PO.create({
  visit: visitable('/companies/:company_id/locations/:location_id'),

  itemDesireCount: count('.item-desires .ui-label-checkbox')
});
