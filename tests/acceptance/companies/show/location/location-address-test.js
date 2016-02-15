import {
  page,
  addressPO
} from '../../../../pages/companies-show-location';

import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | companies/show/location/location address');

test('user should be able to add address info to location', async function(assert) {
  authenticateSession(this.application);

  const company = server.schema.create('company');
  const location = company.createLocation();

  await page
    .visit({company_id:company.id, location_id:location.id});

  await addressPO
    .createNewAddress()
    .fillStreet('1 Center St')
    .fillCity('New York')
    .fillState('NY')
    .fillZip('10021');

  assert.equal(addressPO.street, '1 Center St', 'Street address did not match');
});
