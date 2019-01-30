import Component from '@ember/component';

export default function decorateComponentClass() {
  Component.reopen({
    init() {
      this._super(arguments);
      const debugName = this.toString().split(':')[1]
      const cssName = debugName.split('/').join('_');
      const newName = `debug_${cssName}`;
      if(!this.classNames.includes(newName)) {
        this.classNames = this.classNames.concat(newName);
      }
    }
  });
}
