import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui_label-checkbox-group', 'row'],
  actions: {
    itemClicked({id, text, enabled}) {
      const newCollection = this.get('model')
        .map(item => item.id === id ? {id, text, enabled: !enabled} : item);

      this.attrs.change(newCollection);
    }
  }
});
