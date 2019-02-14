import Component from '@ember/component';
import { computed } from '@ember/object';

const DAYS_OF_WEEK = ["m", "t", "w", "th", "f", "s", "su"];

export default Component.extend({
  classNames:['row', 'stretch'],
  classNameBindings: ["selected"],

  label: computed('model.orderTemplateDays.@each.{enabled}', 'model.frequency', function() {
    const days = this.get("model.orderTemplateDays");
    const frequency = this.get("model.frequency");
    const daysFragment = days
      .filter(otd => otd.get("enabled"))
      .map(otd => DAYS_OF_WEEK[otd.get("day")])
      .join('-');

    const frequencyFragment = `Every ${frequency} week(s)`;

    if(daysFragment === "") {
      return "Not yet scheduled";
    } else {
      return `${daysFragment} - ${frequencyFragment}`;
    }
  }),

  click() {
    this.get('selectOrderTemplate')(this.get('model.id'));
  }
});
