import { page, itemDesiresPO } from 'last-strawberry/tests/pages/companies-show-location';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | companies/show/location/item-desires');

test('renders default item desires when none are present', function(assert) {
  authenticateSession(this.application);

  const items = server.createList('item', 12);

  const company = server.schema.create('company');
  const location = company.createLocation();

  page.visit({company_id:company.id, location_id:location.id});

  andThen(function() {
    assert.equal(items.length, itemDesiresPO.items().count, 'Did not render the correct number of items');
  });
});

test('adds enabled class to enabled items', function(assert) {
  authenticateSession(this.application);

  const items = server.createList('item', 11);

  const company = server.schema.create('company');
  const location = company.createLocation();

  const itemDesires = items
    .map(item => server.create('item-desire', {locationId:location.id, itemId:item.id}));

  page.visit({company_id:company.id, location_id:location.id});

  andThen(function() {
    itemDesires.forEach((itemDesire, i) => assert.equal(itemDesire.enabled, itemDesiresPO.items(i).enabled));
  });
});

test('item desires toggle on click', function(assert) {
  authenticateSession(this.application);

  const items = server.createList('item', 15);
  const company = server.schema.create('company');
  const location = company.createLocation();

  const itemDesires = items
    .map(item => server.create('item-desire', {locationId:location.id, itemId:item.id, enabled:false}));

  page.visit({company_id:company.id, location_id:location.id});

  itemDesiresPO.items(0).click();

  andThen(function() {
    const expectedCollection = itemDesires
      .map((itemDesire, i) => {
        if(i === 0) {
          return {id:itemDesire.id, text:itemDesire.text, enabled:true};
        } else {
          return itemDesire;
        }
      });

    expectedCollection
      .forEach((itemDesire, i) =>
        assert.equal(Boolean(itemDesire.enabled), itemDesiresPO.items(i).enabled, "Didn't toggle after item click"));
  });
});

test('item desires are toggled on click when passed empty item desires collection', function(assert) {
  authenticateSession(this.application);

  const items = server.createList('item', 11);
  const company = server.schema.create('company');
  const location = company.createLocation();

  page.visit({company_id:company.id, location_id:location.id});

  itemDesiresPO.items(0).click();

  andThen(function() {
    const expectedCollection = items
      .map((item, i) => {
        if(i === 0) {
          return {id:item.id, text:item.name, enabled:true};
        } else {
          return item;
        }
      });

    expectedCollection
      .forEach((itemDesire, i) => {
        assert.equal(Boolean(itemDesire.enabled), itemDesiresPO.items(i).enabled, "Didn't toggle after item click!");
      });
  });

});
