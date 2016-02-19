import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import { page, salesOrderPO } from '../../pages/sales-orders-show';

moduleForAcceptance('Acceptance | sales orders/show');

test('navigates to correct url', function(assert) {
  authenticateSession(this.application);

  const company = server.create('company');
  const location = server.create('location', {companyId: company.id});
  const salesOrder = server.create('order', {locationId:location.id});

  page.visit({id:salesOrder.id});

  andThen(function() {
    assert.equal(currentURL(), `/sales-orders/${salesOrder.id}`);
  });
});

test('displays the correct sales order', function(assert) {
  authenticateSession(this.application);

  const company = server.create('company');
  const location = server.create('location', {companyId: company.id});
  const salesOrder = server.create('order', {locationId:location.id});

  page.visit({id:salesOrder.id});

  andThen(function() {
    assert.equal(salesOrderPO.locationName, location.name, 'sales order location name did not match expected');
  });
});
