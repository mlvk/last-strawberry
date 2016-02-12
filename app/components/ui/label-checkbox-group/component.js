import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui-label-checkbox-group', 'row'],
  actions: {
    itemClicked({id, text, enabled}) {
      const oldCollection = Immutable.fromJS(this.get('model'));
      const newCollection = oldCollection.mergeDeep([{id, text, enabled:!enabled}]);
      this.attrs.change(newCollection.toJS());
    }
  }
});
