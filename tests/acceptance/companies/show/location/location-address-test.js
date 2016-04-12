import {
  page,
  addressPO
} from 'last-strawberry/tests/pages/companies-show-location';


import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

import {
  make,
  makeList,
  mockFind,
  mockCreate,
  mockUpdate,
  mockFindAll
} from 'ember-data-factory-guy';

import Ember from 'ember';
const { run } = Ember;

let company,
    locations;

moduleForAcceptance('Acceptance | companies/show/location/location address', {
  beforeEach() {
    authenticateSession(this.application);

    company = make('company');
    locations = makeList('location', {company}, 3);

    mockFindAll('company').returns({models: [company]});
    mockFind('company').returns({model: company});
    mockFind('location').returns({model: locations[0]});
    mockFindAll('location').returns({models: locations});
    mockFindAll('item', 5);
    mockFindAll('price-tier', 1);
  }
});

test('can add address info to location', async function(assert) {
  const fullAddress = '86 7th Avenue, New York City, New York 11217';
  const location = locations[0];
  const address = await location.get('address');

  await page.visit({company_id:company.get('id'), location_id:location.get('id')})

  assert.equal(addressPO.fullAddress, address.get('full'), 'Street address did not match');

  mockUpdate(address);
  mockUpdate(location);
  await addressPO
    .fillSearchAddress(fullAddress)
    .updateAddress();

  assert.equal(addressPO.fullAddress, fullAddress, 'Street address did not match');
});
