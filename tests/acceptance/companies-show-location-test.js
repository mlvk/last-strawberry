import page from '../pages/companies-show-location';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | company/location');

test('renders correct url', function(assert) {
  authenticateSession(this.application);

  const company = server.create('company');
  const location = server.create('location', {companyId: company.id});

  page.visit({company_id:company.id, location_id:location.id});

  andThen(function() {
    assert.equal(currentURL(), `/companies/${company.id}/locations/${location.id}`);
  });
});

test('renders default item desires when none are present', function(assert) {
  authenticateSession(this.application);

  const items = server.createList('item', 12);

  const company = server.create('company');
  const locations = server.createList('location', 2, {companyId: company.id});

  const locationToVisit = locations[0];

  page.visit({company_id:company.id, location_id:locationToVisit.id});

  andThen(function() {
    assert.equal(items.length, page.itemDesireCount, 'Did not render the correct number of items');
  });
});

test('adds enabled class to enabled items', function(assert) {
  authenticateSession(this.application);

  const items = server.createList('item', 11);

  const company = server.create('company');
  const location = server.create('location', {companyId: company.id});

  const itemDesires = items
    .map(item => server.create('item-desire', {locationId:location.id, itemId:item.id}));

  page.visit({company_id:company.id, location_id:location.id});

  andThen(function() {
    assert.equal(items.length, page.itemDesireCount, 'Did not render the correct number of items');

    const domElms = this.$('.item-desires .ui-label-checkbox');

    itemDesires
      .forEach((itemDesire, i) => {
        const el = domElms[i];
        assert.equal(itemDesire.enabled, this.$(el).hasClass('enabled'));
      });
  });

});
