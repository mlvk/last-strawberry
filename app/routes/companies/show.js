import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { run } = Ember;

const INCLUDES = [
  'locations',
	'locations.address'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  setupController(controller, model) {
    controller.set('priceTiers', this.store.peekAll('price-tier'));
    this._super(controller, model);
  },

  model(params){
    return this.store.findRecord('company', params.company_id, {include:INCLUDES.join(',')});
  },

  actions: {
    updatePriceTier(priceTier) {
      const company = this.modelFor('companies.show');

      company.set('priceTier', priceTier);
      company.save();
    },

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

      const location = this.store.createRecord('location', {company, name});
      await location.save();

      this.transitionTo('companies.show.location', location);
    }

  }
});
