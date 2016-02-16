import PO from 'last-strawberry/tests/page-object';

const { visitable, count, value } = PO;

export default PO.create({
  visit: visitable('/companies/:id'),

  locationCount: count('.location'),
  
  name: value('.section-company-settings-form .name'),
  code: value('.section-company-settings-form .code')
});
