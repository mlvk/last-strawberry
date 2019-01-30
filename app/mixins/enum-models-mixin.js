import { hash } from 'rsvp';
import EmberObject, { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
export default Mixin.create({
  enums: computed(function() {
    return EmberObject.create();
  }),

  getEnumModels() {
    var promises = {};
    var modelNames = this.get('enumModelNames') || [];
    modelNames.forEach(model => {
      promises[model.pluralize()] = this.store.findAll(model);
    });

    return promises;
  },

  afterModel(model) {
    return hash(this.getEnumModels(model)).then(r => {
      this.get('enums').setProperties(r);
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    if (!controller.get('enums')) {
      controller.set('enums', this.get('enums'));
    } else {
      controller.get('enums').setProperties(this.get('enums'));
    }
  }
});
