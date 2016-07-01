import Ember from 'ember';
import config from 'last-strawberry/config/environment';

export default Ember.Component.extend({
  classNames: ['row'],
  tagName: 'Footer',
  gitVersion: config.currentRevision
});
