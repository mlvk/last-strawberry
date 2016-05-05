import Ember from 'ember';
import computed from 'ember-computed-decorators';

const DAYS_OF_WEEK = ["m", "t", "w", "th", "f", "s", "su"];

export default Ember.Component.extend({
  classNames: ['ui_day-of-week-selector', 'row'],

  @computed('model.@each.{enabled}')
  collection(model = []) {
    console.log(model);
    return DAYS_OF_WEEK.map((item, i) => {
      const match = model.find(record => record.get('day') === i);

      if(match) {
        return {id:match.get('day'), text:DAYS_OF_WEEK[i], enabled:match.get('enabled')};
      } else {
        return {id:i, text:DAYS_OF_WEEK[i], enabled:false};
      }
    });
  },

  actions: {
    onDayClick(target) {
      this.attrs.change(target.id, !target.enabled);
    }
  }
});
