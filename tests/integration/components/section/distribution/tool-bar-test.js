import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('section/distribution/tool-bar', 'Integration | Component | section/distribution/tool bar', {
  integration: true
});

test('it renders', function(assert) {
  // assert.expect(1);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('routePlans', []);
  this.set('handleDateSelected', () => assert.ok(true));
  this.set('handleNewRoutePlan', () => assert.ok(true));
  this.set('handleSaveRoutePlans', () => assert.ok(true));

  this.render(hbs`{{section/distribution/tool-bar
    routePlans=routePlans
    canCreateRoutePlans=false
    onDateSelected=(action handleDateSelected)
    newRoutePlan=(action handleNewRoutePlan)
    saveRoutePlans=(action handleSaveRoutePlans)
  }}`);

  assert.ok(this.$('.add').hasClass('disabled'));
});
//
// {{section/distribution/tool-bar
//   date=date
//   routeTemplates=routeTemplates
//   newRoutePlan=newRoutePlan
//   onDateSelected=onDateSelected
//   applyTemplate=applyTemplate
//   saveRoutePlans=saveRoutePlans}}
