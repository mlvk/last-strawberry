import { isBlank } from '@ember/utils';
import Component from '@ember/component';

export default Component.extend({
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

      if(!isBlank(text)){
        this.get("submit")(text.trim());
        this.$("input").val("");
      }
    }
  }
});
