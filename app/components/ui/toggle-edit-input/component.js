import Component from '@ember/component';

export default Component.extend({
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
