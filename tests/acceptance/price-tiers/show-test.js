import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import { show as page } from 'last-strawberry/tests/pages/price-tiers';

import {
  make,
  // makeList
  mockFind,
  mockFindAll
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | price tiers', {
  beforeEach() {
    authenticateSession(this.application);
    mockFindAll('price-tier');
  }
});

test('Shows the name of the price tier', async function(assert) {
  const priceTier = make('price-tier');

  mockFind('price-tier').returns({model:priceTier});

  await page.visit({id:1});

  assert.equal(page.name, priceTier.get('name'));
});
