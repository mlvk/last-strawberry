window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "Ember.String.fmt is deprecated, use ES6 template strings instead." },
    { handler: "silence", matchMessage: "Using the injected `container` is deprecated. Please use the `getOwner` helper instead to access the owner of this object." },
    { handler: "silence", matchMessage: "A property of <last-strawberry@view:-outlet::ember507> was modified inside the didInsertElement hook. You should never change properties on components, services or models during didInsertElement because it causes significant performance degradation." },
    { handler: "silence", matchMessage: "A property of <last-strawberry@view:-outlet::ember576> was modified inside the didInsertElement hook. You should never change properties on components, services or models during didInsertElement because it causes significant performance degradation." }
  ]
};
