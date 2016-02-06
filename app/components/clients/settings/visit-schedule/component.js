import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['col', 'uBorP'],
  daysOfWeek: ["m", "t", "w", "th", "f", "s", "su"],
  // store: Ember.inject.service(),
  //
  // @computed('model.clientVisitDays.[]')
  // desiredVisitDays (clientVisitDays) {
  //   return _.range(7).map(day => {
  //     const cvd = clientVisitDays.find(cvd => cvd.get('day') === day);
  //     return { cvd, day };
  //   });
  // },
  //
  // actions : {
  //   toggled (data, selected) {
  //     this.attrs.updateClientVisitDate(data, selected);
  //   }
  // }

});
