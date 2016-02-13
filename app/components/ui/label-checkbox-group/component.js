import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui-label-checkbox-group', 'row'],
  actions: {
    itemClicked({id, text, enabled}) {

      // const oldCollection = Immutable.fromJS(this.get('model'));
      const newCollection = this.get('model')
        .map(item => item.id === id ? {id, text, enabled: !enabled} : item)

      this.attrs.change(newCollection);
    }
  }
});
