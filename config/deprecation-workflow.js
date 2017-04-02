window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "Ember.String.fmt is deprecated, use ES6 template strings instead." },
    { handler: "silence", matchMessage: "Usage of `Ember.merge` is deprecated, use `Ember.assign` instead." },
    { handler: "silence", matchId: "ember-views.dispatching-modify-property" },
    { handler: "silence", matchId: "container-lookupFactory"},
    { handler: "silence", matchId: "ember-metal.ember-k"},
    { handler: "silence", matchId: "ember-views.lifecycle-hook-arguments"},
    { handler: "silence", matchId: "ember-native-dom-helpers.test-support.helpers"}
    ]
};
