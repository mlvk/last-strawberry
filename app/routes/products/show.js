import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { get } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params){
    return this.store.findRecord('item', params.id);
  },

  actions: {
    save(changeset) {
      console.log(changeset);
      return changeset
        .validate()
        .then(() => {
          if (get(changeset, 'isValid')) {
            changeset.execute();
            const item = this.modelFor('products.show');
            return item.save();
          }
        }).catch((error) => {
          console.log(error);
          // throw new Error(error);
        });
    },

    reset(changeset) {
      return changeset.rollback();
    },

    validateProperty(changeset, property) {
      return changeset.validate(property);
    }
  }
});
