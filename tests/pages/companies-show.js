import PO from 'last-strawberry/tests/page-object';

const { visitable, count, value } = PO;

export default PO.create({
  visit: visitable('/companies/:id'),

  locationCount: count('.location'),
  
  name: value('.section_company_company-settings .name'),
  code: value('.section_company_company-settings .code')
});
