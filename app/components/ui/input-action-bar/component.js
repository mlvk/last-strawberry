import Ember from "ember";

export default Ember.Component.extend({
  classNames: ["row", "ui_input-action-bar"],

  didInsertElement() {
    this._super(...arguments);
    if(this.get("autoFocus")){
      this.$("input").focus();
    }
  },

  actions: {
    submit() {
      const text = this.$("input").val();

      if(!Ember.isBlank(text)){
        this.get("submit")(text.trim());
        this.$("input").val("");
      }
    }
  }
});
