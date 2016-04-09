import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import page from '../pages/distribution';

moduleForAcceptance('Acceptance | distribution');

test('visiting distribution defaults to tomorrows date', function(assert) {
  authenticateSession(this.application);

  const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

  page.visit({date:tomorrow});

  andThen(function() {
    assert.equal(currentURL(), `/distribution?date=${tomorrow}`);
  });
});

test('orders display when there are valid orders', function(assert) {
  authenticateSession(this.application);

  const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

  const item = server.create('item');

  const company = server.create('company');

  const address1 = server.create('address');
  const address2 = server.create('address');

  const location1 = server.create('location', {companyId: company.id, addressId:address1.id});
  const location2 = server.create('location', {companyId: company.id, addressId:address2.id});

  const salesOrder1 = server.create('order', {locationId:location1.id, deliveryDate:tomorrow});
  server.create('order-item', {orderId:salesOrder1.id, itemId:item.id, quantity:10});

  const salesOrder2 = server.create('order', {locationId:location2.id, deliveryDate:tomorrow});
  server.create('order-item', {orderId:salesOrder2.id, itemId:item.id, quantity:10});

  page.visit({date:tomorrow});

  andThen(function() {
    assert.equal(page.orderGroups().count, 2);
  });
});

test('cannot create route plans when no orders are present', function(assert) {
  authenticateSession(this.application);

  page
    .visit()
    .createRoutePlan();

  andThen(function() {
    assert.equal(page.routePlans().count, 0);
  });
});

test('can delete route plan', function(assert) {
  authenticateSession(this.application);

  const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

  const item = server.create('item');

  const company = server.create('company');

  const address1 = server.create('address');
  const address2 = server.create('address');

  const location1 = server.create('location', {companyId: company.id, addressId:address1.id});
  const location2 = server.create('location', {companyId: company.id, addressId:address2.id});

  const salesOrder1 = server.create('order', {locationId:location1.id, deliveryDate:tomorrow});
  server.create('order-item', {orderId:salesOrder1.id, itemId:item.id, quantity:10});

  const salesOrder2 = server.create('order', {locationId:location2.id, deliveryDate:tomorrow});
  server.create('order-item', {orderId:salesOrder2.id, itemId:item.id, quantity:10});
  
  page
    .visit()
    .createRoutePlan()
    .deleteLastRoutePlan();

  andThen(function() {
    assert.equal(page.routePlans().count, 0);
  });
});
