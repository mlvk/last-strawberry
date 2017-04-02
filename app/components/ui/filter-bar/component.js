import Ember from "ember";

export default Ember.Component.extend({
  classNames: ["row", "stretch"],
  actions: {
    onChange(e) {
      this.get("onChange")(e.target.value);
    },

    clear() {
      this.set("value", "");
    }
  }
});
