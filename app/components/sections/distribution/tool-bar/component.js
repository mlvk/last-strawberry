import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { not, notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['row'],
  currentSelectedRoutePlanTemplate: undefined,

  @computed('date')
  formattedDate(date) {
    return moment(date).format('YYYY-MM-DD');
  },

  disabled: not('canCreateRoutePlans'),
  hasRoutePlanTemplates: notEmpty('routePlanTemplates'),

  actions: {
    handleCreateRoutePlan() {
      if(!this.get('disabled')){
        this.attrs.newRoutePlan();
      }
    },

    selectRouteTemplate(template) {
      this.set('currentSelectedRoutePlanTemplate', undefined);
      this.attrs.applyTemplate(template);
    }
  }
});
