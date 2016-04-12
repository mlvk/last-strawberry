import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import page from 'last-strawberry/tests/pages/distribution';

import {
  make,
  makeList,
  mockDelete,
  mockFindAll
} from 'ember-data-factory-guy';

const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

moduleForAcceptance('Acceptance | distribution', {
  beforeEach() {
    authenticateSession(this.application);
    mockFindAll('user', 1);
  }
});

test('visiting distribution defaults to tomorrows date', async function(assert) {
  const locations = makeList('location', 5);
  const orders = locations.map(location => make('order', {location}));
  const routePlan = make('route-plan');
  orders.map(async order => {
    const visitWindow = await order.get('location.defaultVisitWindow');
    return make('route-visit', {visitWindow, routePlan});
  });

  mockFindAll('order').returns({models: orders});
  mockFindAll('route-plan').returns({models: [routePlan]});

  await page.visit({date:tomorrow});

  assert.equal(currentURL(), `/distribution?date=${tomorrow}`);
});

test('orders display when there are valid orders', async function(assert) {
  mockFindAll('order', 5, {deliveryDate:tomorrow});
  mockFindAll('route-plan');

  await page.visit();

  assert.equal(page.orderGroups().count, 5);
});

test('cannot create route plans when no orders are present', async function(assert) {
  mockFindAll('order');
  mockFindAll('route-plan');

  await page
    .visit()
    .createRoutePlan();

  assert.equal(page.routePlans().count, 0);
});

test('can create route plans when orders are present', async function(assert) {
  mockFindAll('route-plan');
  mockFindAll('order', 10);

  await page
    .visit()
    .createRoutePlan();

  assert.equal(page.routePlans().count, 1);
});

test('can delete route plans', async function(assert) {
  assert.expect(2);

  mockFindAll('order');
  mockFindAll('route-plan', 1);
  await page.visit();

  assert.equal(page.routePlans().count, 1);

  mockDelete('route-plan', 1);
  await page.deleteLastRoutePlan();

  assert.equal(page.routePlans().count, 0);
});

test('admins can delete individual route visit', async function(assert) {
  const orders = makeList('order', 5);
  const routePlan = make('route-plan');
  orders.map(o => make('route-visit', {routePlan, visitWindow:o.get('location.defaultVisitWindow')}));

  mockFindAll('route-plan').returns({models: [routePlan]});
  mockFindAll('order').returns({models: orders});
  await page.visit();

  assert.equal(page.routePlans(0).routeVisits().count, 5);

  mockDelete('route-visit', 1);
  await page.routePlans(0).routeVisits(0).delete();

  assert.equal(page.routePlans(0).routeVisits().count, 4);
});
