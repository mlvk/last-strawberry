import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames:['row'],

  group: computed('selectedIndexes', 'labels', function() {
    const selectedIndexes = this.get("selectedIndexes") || [];
    const labels = this.get("labels") || [];
    return labels.map((label, index) => {
      return {label, index, selected: selectedIndexes.includes(index)};
    });
  }),

  actions: {
    toggle(indexToToggle) {
      const newSelections = this.get('group')
        .map((el, index) => (index === indexToToggle) ? {index, label: el.label, selected: !el.selected} : el)
        .filter(el => el.selected)
        .map(el => el.index);

      this.get("onUpdate")(newSelections);
    }
  }
});
