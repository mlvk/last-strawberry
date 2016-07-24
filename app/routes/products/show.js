import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { get } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params){
    return this.store.findRecord('item', params.id);
  },

  actions: {
    save(changeset) {
      return changeset
        .validate()
        .then(() => {
          if (get(changeset, 'isValid')) {
            changeset.execute();
            const item = this.modelFor('products.show');
            return item.save();
          }
        }).catch(() => {
          // console.log(error);
        });
    },

    destroyProduct() {
      this.modelFor('products.show')
        .destroyRecord()
        .then(() => this.transitionTo('products'));
    },

    reset(changeset) {
      return changeset.rollback();
    },

    validateProperty(changeset, property) {
      return changeset.validate(property);
    }
  }
});
