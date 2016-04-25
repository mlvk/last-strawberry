import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'stretch'],

  didInsertElement() {
    this.mouseUps = Rx.Observable.fromEvent(window, 'mouseup');
    this.toggles = new Rx.Subject();

    this._setupStreamListeners();
  },

  willDestroyElement() {
    this.togglesSub.dispose();
    this.mouseUpsSub.dispose();
  },

  _setupStreamListeners() {
    this.togglesSub = this.toggles
      .subscribe(nextState => this.set('showMenu', nextState));

    this.mouseUpsSub = this.mouseUps
      .filter(({target}) => target !== this.$(".trigger")[0])
      .filter(() => this.get('showMenu'))
      .subscribe(() => this.set('showMenu', false));
  },

  actions: {
    toggle() {
      this.toggles.onNext(!this.get('showMenu'));
    }
  }
});
