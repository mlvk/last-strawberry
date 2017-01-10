import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import preferencesMock from "last-strawberry/tests/mocks/preferences-service";
import Ember from "ember";

moduleForComponent("ui/persistent-collapsable-container", "Integration | Component | ui/persistent collapsable container", {
  integration: true,
  beforeEach: function () {
    this.register("service:preferencesService", preferencesMock);
    this.inject.service("preferencesService", { as: "preferences" });
  }
});

test("it expands by default", function(assert) {
  this.render(hbs`{{ui/persistent-collapsable-container
    settingsKey="isClosed"
    title="Title"}}`);

  assert.equal(this.$(".hidden").length, 0);
});

test("it collapse if settings flag is false", function(assert) {
  this.render(hbs`{{ui/persistent-collapsable-container
    settingsKey="isClosed"
    title="Title"}}`);

  Ember.run(() => {
    this.get("preferences").setPreference("isClosed", true);
  });
  assert.equal(this.$(".hidden").length, 1, "collapsed if settings flag is true");
});

test("it expands if settings flag is false", function(assert) {
  this.render(hbs`{{ui/persistent-collapsable-container
    settingsKey="isClosed"
    title="Title"}}`);

  Ember.run(() => {
    this.get("preferences").setPreference("isClosed", false);
  });
  assert.equal(this.$(".hidden").length, 0, "expanded if settings flag is false");
});
