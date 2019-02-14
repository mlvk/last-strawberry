import Component from '@ember/component';
import colors from 'last-strawberry/constants/colors';
import { computed } from '@ember/object';
import { buildStyles } from "last-strawberry/utils/styles";

export default Component.extend({
  classNames: ['row'],

  menuColors: computed('backgroundColor', function() {
    const colorScheme = this.get('backgroundColor') || {backgroundColor: colors.SKY_BLUE};
    return buildStyles({'background-color': colorScheme.backgroundColor});
  }),

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
      // @FIXME: All the events of sub menu items will be canceled if it is not showed
      .delay(100)
      .subscribe(() => this.set('showMenu', false));
  },

  actions: {
    toggle() {
      this.toggles.onNext(!this.get('showMenu'));
    }
  }
});
