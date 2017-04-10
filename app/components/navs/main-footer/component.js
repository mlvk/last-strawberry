import Ember from 'ember';

export default Ember.Component.extend({
  quotes: Ember.inject.service(),
  classNames: ['row', "spaceBetween", "center"],
  tagName: 'Footer'
});
