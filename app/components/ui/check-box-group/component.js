import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames:['row'],
  @computed('selectedIndexes', 'labels')
  group(selectedIndexes = [], labels = []) {
    return labels.map((label, index) => {
      return {label, index, selected: selectedIndexes.contains(index)};
    });
  },

  actions: {
    toggle(indexToToggle) {
      const newSelections = this.get('group')
        .map((el, index) => (index === indexToToggle) ? {index, label: el.label, selected: !el.selected} : el)
        .filter(el => el.selected)
        .map(el => el.index);

      this.attrs.onUpdate(newSelections);
    }
  }
});
