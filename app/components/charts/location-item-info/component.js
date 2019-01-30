import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  classNames: ["col", "spaceBetween", "card-1"],
  classNameBindings: ["hasItem::hidden"],
  hasData:        notEmpty("salesData"),
  hasItem:        notEmpty("item"),
  hasLastUpdated: notEmpty("salesData.ts"),

  @computed("salesData.ts")
  lastUpdated(timestamp) {
    return moment.unix(timestamp);
  }
});
