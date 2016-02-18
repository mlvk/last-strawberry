import {
  addressPO
} from '../../../../pages/companies-show-location';

import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | companies/show/location/location address');

test('user should be able to add address info to location', function(assert) {
  authenticateSession(this.application);

  const company = server.create('company');
  const address = server.create('address');
  const location = server.create('location', {companyId:company.id, addressId:address.id});

  addressPO
    .visit({company_id:company.id, location_id:location.id})
    .fillStreet('1 Center St')
    .fillCity('New York')
    .fillState('NY')
    .fillZip('10021')
    .fillLat('74')
    .fillLon('75');

  andThen(() => {
    assert.equal(addressPO.street, '1 Center St', 'Street address did not match');
    assert.equal(addressPO.city, 'New York', 'City did not match');
    assert.equal(addressPO.state, 'NY', 'State did not match');
    assert.equal(addressPO.zip, '10021', 'Zip did not match');
    assert.equal(addressPO.lat, '74', 'Lat did not match');
    assert.equal(addressPO.lon, '75', 'Lon did not match');
  });
});
