import PikadayInputComponent from 'ember-pikaday/components/pikaday-input';

export default PikadayInputComponent.extend({
  classNames: ['datePicker'],
  onPikadaySelect() {
    this._super();
    this.attrs.onSelect(this.get('value'));
  }
});
