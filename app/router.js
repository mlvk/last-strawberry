import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('orders');
  this.route('clients', function() {
    this.route('show', {path:':id'});
  });
  this.route('distribution');
});

export default Router;
