import Em from 'ember';
import computed from 'ember-computed-decorators';

export default Em.Component.extend({
  classNames: ['col'],
  classNameBindings: ['indexStyle'],

  @computed('model.id')
  saveTemplateDomId(id) {
    return `saveTemplate-${id}`
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
