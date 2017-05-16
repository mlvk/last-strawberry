import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  makeList,
  manualSetup
} from 'ember-data-factory-guy';

moduleForComponent('sections/standing-orders', 'Integration | Component | sections/standing orders', {
  integration: true,

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test('it renders list of locations', function(assert) {
  const locations = makeList('location', 1);
  const items = makeList('item', 1);

  this.set("locations", locations);
  this.set("items", items);
  this.set("selectLocation", () => {});

  this.render(hbs`{{sections/standing-orders
      locations=locations
      items=items
      selectLocation=selectLocation
    }}`);

  assert.equal(this.$('.parent').text().trim(), locations[0].get('company.name'));
  assert.equal(this.$('.child').text().trim(), locations[0].get('name'));
});
