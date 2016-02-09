import PO from 'last-strawberry/tests/page-object';

const { visitable, count } = PO;

export default PO.create({
  visit: visitable('/companies/:id'),

  companyCount: count('ul > .company')
});
