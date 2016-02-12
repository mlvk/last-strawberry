import Ember from 'ember';

export default function decorateComponentClass() {
  Ember.Component.reopen({
    init() {
      this._super(arguments);
      const debugName = this.constructor.toString().split(':')[1]
      const cssName = debugName.split('/').join('-');
      this.classNames.pushObject(cssName);
    }
  });
}
