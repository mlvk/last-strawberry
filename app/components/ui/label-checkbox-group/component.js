import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    itemClicked({id, label, enabled}) {
      const oldCollection = Immutable.fromJS(this.get('model'));
      const newCollection = oldCollection.mergeDeep([{id, label, enabled:!enabled}]);
      this.attrs.changed(newCollection.toJS());
    }
  }
});
