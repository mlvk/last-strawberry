import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['row'],

  formattedIndex: computed('index', function() {
    const index = this.get("index");
    const num = S(index + 1).padLeft(2, '0').s;
    return `${num}.`;
  })
});
