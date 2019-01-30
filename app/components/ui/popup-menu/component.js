import Component from '@ember/component';
import { style } from 'last-strawberry/utils/styles';
import colors from 'last-strawberry/constants/colors';

export default Component.extend({
  classNames: ['row'],

  @style('backgroundColor')
  menuColors(colorScheme = {backgroundColor: colors.SKY_BLUE}) {
    return {
      'background-color': colorScheme.backgroundColor
    };
  },

  init() {
    this._super(...arguments);
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
