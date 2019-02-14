import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ["col", "spaceBetween", "card-1"],
  classNameBindings: ["hasItem::hidden"],
  hasData:        notEmpty("salesData"),
  hasItem:        notEmpty("item"),
  hasLastUpdated: notEmpty("salesData.ts"),

  lastUpdated: computed("salesData.ts", function() {
    const timestamp = this.get("salesData.ts");
    return moment.unix(timestamp);
  })
});
