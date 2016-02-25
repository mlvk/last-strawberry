import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['row'],

  @computed('date')
  formattedDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }
});
