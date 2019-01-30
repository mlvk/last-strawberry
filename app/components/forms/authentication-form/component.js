import Component from '@ember/component';
import { notEmpty, bool } from '@ember/object/computed';

export default Component.extend({
  hasError: notEmpty("error"),
  isLoading: bool("loading"),

  actions: {
    submit() {
      this.set("loading", true);
      this.set("error", undefined);

      this.get("authenticate")(this.get("identification"), this.get("password"))
        .then(() => {
          this.set("loading", false);
        })
        .catch((e = { error : "Could not connect to the server."}) => {
          this.set("loading", false);
          this.set("error", e.error);
        })
    }
  }
});
