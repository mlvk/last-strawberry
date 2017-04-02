import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleEditing() {
      this.set('editing', true);
    },

    onBlur() {
      this.set('editing', false);
      if(_.isFunction(this.get("onblur"))){
        this.get("onblur")();
      }
    }
  }
});
