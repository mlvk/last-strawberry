import Ember from 'ember';
import ProductValidations from 'last-strawberry/validations/product';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  @computed('session')
  validations(session) {
    return ProductValidations(session);
  }
});
