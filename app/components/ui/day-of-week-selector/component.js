import Component from '@ember/component';
import { computed } from '@ember/object';

const DAYS_OF_WEEK = ["m", "t", "w", "th", "f", "s", "su"];

export default Component.extend({
  classNames: ['ui_day-of-week-selector', 'row'],

  collection: computed('model.@each.{enabled}', function() {
    const model = this.get("model") || [];
    return DAYS_OF_WEEK.map((item, i) => {
      const match = model.find(record => record.get('day') === i);

      if(match) {
        return {id:match.get('day'), text:DAYS_OF_WEEK[i], enabled:match.get('enabled')};
      } else {
        return {id:i, text:DAYS_OF_WEEK[i], enabled:false};
      }
    });
  }),

  actions: {
    onDayClick(target) {
      this.get("change")(target.id, !target.enabled);
    }
  }
});
