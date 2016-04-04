window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "Ember.String.fmt is deprecated, use ES6 template strings instead." },
    { handler: "silence", matchMessage: "Usage of `Ember.merge` is deprecated, use `Ember.assign` instead." }
    ]
};
