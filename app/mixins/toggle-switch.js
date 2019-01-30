import Mixin from '@ember/object/mixin';

export default Mixin.create({
  expanded: false,
  actions: {
    toggle() {
      this.toggleProperty('expanded');
    }
  }
});
