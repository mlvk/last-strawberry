import Ember from 'ember';
import computed from 'ember-computed-decorators';
import colors from 'last-strawberry/constants/colors';

const colorSchemes = [
  {backgroundColor:colors.DARK_PINK, color:'white'},
  {backgroundColor:colors.DOPE_BLUE, color:'white'}
]

export default Ember.Component.extend({
  classNames: ['col'],
  classNameBindings: ['indexStyle'],

  routePlanId: Ember.computed.alias('model.id'),

  @computed('index')
  colorScheme(index) {
    return colorSchemes[index];
  },


  actions: {
    delete() {
      this.attrs.destroyRoutePlan(this.get('model'));
    },

    saveTemplate() {
      this.attrs.saveAsTemplate(this.get('model'));
    }
  }
});
