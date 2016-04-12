import { page, itemDesiresPO } from 'last-strawberry/tests/pages/companies-show-location';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import {
  make,
  makeList,
  mockUpdate,
  mockFind,
  mockFindAll } from 'ember-data-factory-guy';

let items,
    priceTier,
    company,
    location;

moduleForAcceptance('Acceptance | companies/show/location/item-desires', {
  beforeEach() {
    authenticateSession(this.application);

    items = makeList('item', 3);
    priceTier = make('price-tier');
    company = make('company', {priceTier});
    location = make('location', {company});

    mockFind('location').returns({model: location});
    mockFind('company').returns({model: company});
    mockFindAll('item').returns({models: items});
    mockFindAll('company').returns({models: [company]});
    mockFindAll('priceTier').returns({models: [priceTier]});
  }
});

test('renders default item desires when no item desires are present', async function(assert) {
  await page.visit({company_id:company.get('id'), location_id:location.get('id')});

  assert.equal(items.length, itemDesiresPO.items().count, 'Did not render the correct number of items');
});

test('adds enabled class to enabled items', async function(assert) {
  assert.expect(items.length);

  const itemDesires = items.map(item => make('item-desire', {item, location, enabled:true}));

  await page.visit({company_id:company.get('id'), location_id:location.get('id')});

  itemDesires.forEach((itemDesire, i) => assert.equal(itemDesire.get('enabled'), itemDesiresPO.items(i).enabled));
});

test('does not add enabled class to disabled items', async function(assert) {
  assert.expect(items.length);

  const itemDesires = items.map(item => make('item-desire', {item, location, enabled:false}));

  await page.visit({company_id:company.get('id'), location_id:location.get('id')});

  itemDesires.forEach((itemDesire, i) => assert.equal(itemDesire.get('enabled'), itemDesiresPO.items(i).enabled));
});

test('item desires toggle on click', async function(assert) {
  const itemDesires = items.map(item => make('item-desire', {item, location, enabled:true}));

  await page.visit({company_id:company.get('id'), location_id:location.get('id')});

  mockUpdate(itemDesires[0]);
  await itemDesiresPO.items(0).click();

  assert.equal(false, itemDesiresPO.items(0).enabled, "Didn't toggle after item click");
  assert.equal(true, itemDesiresPO.items(1).enabled, "Changed even though wasn't clicked");
});
