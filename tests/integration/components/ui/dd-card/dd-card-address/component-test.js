import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import decorateComponentClass from 'last-strawberry/tests/helpers/decorate-component-class';

import {
  make,
  manualSetup
} from 'ember-data-factory-guy';

moduleForComponent('ui/dd-card/dd-card-address', 'Integration | Component | ui/dd card/dd card address', {
  integration: true,

  beforeEach: function () {
    decorateComponentClass();
    manualSetup(this.container);
  }
});

test('it renders', function(assert) {

  const address = make('address');

  this.set('address', address);
  this.render(hbs`{{ui/dd-card/dd-card-address address}}`);

  assert.equal(this.$('.street').text().trim(), address.get('street'));
  assert.equal(this.$('.city').text().trim(), address.get('city'));

});
