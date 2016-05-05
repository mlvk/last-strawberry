import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/locations/summary-card', 'Integration | Component | sections/locations/summary card', {
  integration: true
});

test('it renders', function(assert) {
  this.set('name', 'Wutang Clan');
  this.set('id', 1);

  this.set('clicked', (id) => {
    assert.equal(id, 1);
  });

  this.render(hbs`{{sections/locations/summary-card
                    name=name
                    id=id
                    click=(action clicked 1)}}`);

  assert.equal(this.$('.name').text().trim(), 'Wutang Clan');
  assert.equal(this.$('.id').text().trim(), '1');

  this.$('.location').click();
});
