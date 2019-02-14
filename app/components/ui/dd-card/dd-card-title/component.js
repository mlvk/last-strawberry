import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ["row"],
  hasIndex: notEmpty("index"),
  hasAction: notEmpty("action"),

  indexFormatted: computed("index", function() {
    const index = this.get("index");
    return S(index + 1).padLeft(2, "0").s;
  })
});
