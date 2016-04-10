import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import { page } from 'last-strawberry/tests/pages/sales-orders';

moduleForAcceptance('Acceptance | sales orders');

test('navigates to correct url', function(assert) {
  authenticateSession(this.application);

  page.visit();

  andThen(function() {
    assert.equal(currentURL(), '/sales-orders');
  });
});

test('should automatically show tomorrows orders', function(assert) {
  authenticateSession(this.application);

  const company = server.create('company');
  const locations = server.createList('location', 10, {companyId: company.id});
  const salesOrders = locations
    .map(location => {
      return server.create('order', {locationId:location.id, deliveryDate: moment().add(1, 'days').format('YYYY-MM-DD')});
    });

  page.visit();

  andThen(function() {
    assert.equal(page.locations().count, salesOrders.length, 'Wrong number of locations rendered');
  });
});

test('should show sales order when location is clicked', function(assert) {
  authenticateSession(this.application);

  const company = server.create('company');
  const locations = server.createList('location', 10, {companyId: company.id});
  const salesOrders = locations
    .map(location => {
      return server.create('order', {locationId:location.id, deliveryDate: moment().add(1, 'days').format('YYYY-MM-DD')});
    });

  page
    .visit()
    .locations(1)
    .click();

  andThen(() => {
    const id = salesOrders[1].id;
    assert.equal(currentURL(), `/sales-orders/${id}`, 'URL does not match expected');
  });
});
