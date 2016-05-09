import Em from 'ember';
import computed from 'ember-computed-decorators';

export default Em.Component.extend({
  classNames: ['col'],
  classNameBindings: ['indexStyle'],

  @computed('model.id')
  saveRoutePlanBlueprintDomId(id) {
    return `saveRoutePlanBlueprint-${id}`
  },

  actions: {
    delete() {
      this.attrs.destroyRoutePlan(this.get('model'));
    },

    saveRoutePlanBlueprint() {
      this.attrs.saveRoutePlanBlueprint(this.get('model'), this.$('.saveRoutePlanBlueprint'));
    }
  }
});
