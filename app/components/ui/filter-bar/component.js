import Component from '@ember/component';

export default Component.extend({
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
