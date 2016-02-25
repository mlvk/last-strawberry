import Em from 'ember';
import computed from 'ember-computed-decorators';
import colors from 'last-strawberry/constants/colors';

const { computed : { alias } } = Em;

const colorSchemes = [
  {backgroundColor:colors.DARK_PINK, color:'white'},
  {backgroundColor:colors.DOPE_BLUE, color:'white'}
]

export default Em.Component.extend({
  classNames: ['col'],
  classNameBindings: ['indexStyle'],

  @computed('model.id')
  saveTemplateDomId(id) {
    return `saveTemplate-${id}`
  },

  @computed('index')
  colorScheme(index) {
    return colorSchemes[index];
  },

  actions: {
    delete() {
      this.attrs.destroyRoutePlan(this.get('model'));
    },

    saveTemplate() {
      this.attrs.saveTemplate(this.get('model'), this.$('.saveTemplate'));
    }
  }
});
