import Ember from 'ember';
import computed from 'ember-computed-decorators';

const DAYS_OF_WEEK = ["m", "t", "w", "th", "f", "s", "su"];

export default Ember.Component.extend({
  classNames: ['visit-days'],

  @computed('visitDays.@each.{enabled}')
  collection(visitDays = []) {
    return DAYS_OF_WEEK.map((item, i) => {
      const match = visitDays.find(visitDay => visitDay.get('day') === i);

      if(match) {
        return {id:match.get('day'), text:DAYS_OF_WEEK[i], enabled:match.get('enabled')};
      } else {
        return {id:i, text:DAYS_OF_WEEK[i], enabled:false};
      }
    });
  }
});
