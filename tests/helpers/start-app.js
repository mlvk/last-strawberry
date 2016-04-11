import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import decorateComponentClass from './decorate-component-class';

export default function startApp(attrs) {
  let application;

  let attributes = Ember.assign({}, config.APP);
  attributes = Ember.assign(attributes, attrs); // use defaults, but you can override;

  $.mockjaxSettings.logging = false;

  Ember.run(() => {
    decorateComponentClass();
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
