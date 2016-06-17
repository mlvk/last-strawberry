import Ember from 'ember';

const { empty } = Ember.computed;

export default Ember.Component.extend({

  notReady: empty('currentItem'),

  actions: {
    stashSelection(item) {
      this.set('currentItem', item);
    },

    onSubmit() {
      this.attrs.onSubmit(this.get('currentItem'));
      this.attrs.close();
    }
  }
});
