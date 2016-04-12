import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { run } = Ember;

const INCLUDES = [
  'locations',
	'locations.address'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model(params){
    return this.store.findRecord('company', params.company_id, {include:INCLUDES.join(',')});
  },

  actions: {
    fieldChanged(model, key, value) {
      model.set(key, value);
    },

    showLocation(id) {
      this.transitionTo('companies.show.location', id);
    },

    companyChanged(model, key, value) {
      model.set(key, value);
    },

    async saveCompany() {
      const company = this.modelFor('companies.show');
      if(!company.get('isSaving')) {
        run(() => company.save());
      }
    },

    async createNewLocation() {
      const company = this.modelFor('companies.show');
      const currentLocationCount = company.get('locations.length');
      const newSuffix = S(currentLocationCount + 1).padLeft(3, '0');
      const code = `${company.get('code')}-${newSuffix}`;
      const name = 'untitled';
      const address = this.store.createRecord('address');
      const location = this.store.createRecord('location', {company, code, name, address});
      await location.save();
      this.transitionTo('companies.show.location', location);
    }

  }
});
