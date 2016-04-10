import {
  addressPO
} from 'last-strawberry/tests/pages/companies-show-location';

import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | companies/show/location/location address');

test('user should be able to add address info to location', function(assert) {
  authenticateSession(this.application);

  const company = server.create('company');
  const address = server.create('address');
  const location = server.create('location', {companyId:company.id, addressId:address.id});

  const fullAddress = '86 7th Avenue, New York City, New York 11217';

  addressPO
    .visit({company_id:company.id, location_id:location.id})
    .fillSearchAddress(fullAddress)
    .updateAddress();

  andThen(() => {
    assert.equal(addressPO.fullAddress, fullAddress, 'Street address did not match');
  });
});
