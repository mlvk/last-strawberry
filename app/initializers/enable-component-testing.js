import Ember from 'ember';

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  Ember.Component.reopen({
    init() {
      this._super(arguments);
      const debugName = this.constructor.toString().split(':')[1]
      const cssName = debugName.split('/').join('-');
      this.classNames.pushObject(cssName);
    }
  });
}

export default {
  name: 'enable-component-testing',
  initialize
};
