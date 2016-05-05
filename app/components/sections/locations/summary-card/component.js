import Ember from 'ember';

const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['card-1', 'location'],

  hasName: notEmpty('name')
});
