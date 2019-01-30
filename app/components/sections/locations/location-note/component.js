import Component from '@ember/component';

export default Component.extend({
  classNames: ["col", "card-1"],

  actions: {
    noteChanged(e) {
      this.set("locationNote", e.target.value);
    }
  }
});
