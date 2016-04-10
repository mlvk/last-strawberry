import {
  page,
  visitSchedulePO,
  visitDaysPO
} from 'last-strawberry/tests/pages/companies-show-location';

import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | companies/show/location/visit-schedule');

test('renders default item desires when none are present', function(assert) {
  authenticateSession(this.application);

  const company = server.schema.create('company');
  const location = company.createLocation();

  page.visit({company_id:company.id, location_id:location.id});

  andThen(function() {
    assert.equal(7, visitDaysPO.dayOptions().count, 'Did not render the correct number of items');
  });
});

test('adds enabled class to enabled items', function(assert) {
  authenticateSession(this.application);

  const company = server.schema.create('company');
  const location = company.createLocation();

  const visitDays = [0,1,2,3,4,5,6]
    .map(day => server.create('visit-day', {locationId:location.id, day}));

  page.visit({company_id:company.id, location_id:location.id});

  andThen(function() {
    visitDays.forEach((visitDay, i) => assert.equal(visitDay.enabled, visitDaysPO.dayOptions(i).enabled));
  });
});

test('clicking add visit window creates a new visit window', function(assert) {
  authenticateSession(this.application);

  const company = server.schema.create('company');
  const location = company.createLocation();

  page.visit({company_id:company.id, location_id:location.id});

  assert.equal(visitSchedulePO.visitWindows().count, 0);
  visitSchedulePO.createNewVisitWindow();

  andThen(function() {
    assert.equal(visitSchedulePO.visitWindows().count, 1);
  });
});
