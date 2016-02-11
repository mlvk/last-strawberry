import PO from 'last-strawberry/tests/page-object';

const { visitable, count } = PO;

export default PO.create({
  visit: visitable('/companies'),

  // Not sure why this doesn't work. According to jquery docs
  // this is how you select ancestor descendant
  companyCount: count('.list-filterable-label-list .name')
});
