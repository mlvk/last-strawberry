import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { not } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['row'],

  @computed('date')
  formattedDate(date) {
    return moment(date).format('YYYY-MM-DD');
  },

  disabled: not('canCreateRoutePlans'),

  actions: {
    handleCreateRoutePlan() {
      if(!this.get('disabled')){
        this.attrs.newRoutePlan();
      }
    }
  }
});
