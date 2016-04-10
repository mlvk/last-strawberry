import PO from 'last-strawberry/tests/page-object';

const { visitable, count, value } = PO;

export default PO.create({
  visit: visitable('/companies/:id'),

  locationCount: count('.location'),

  name: value('.debug_section_companies_company-settings .name'),
  code: value('.debug_section_companies_company-settings .code')
});
