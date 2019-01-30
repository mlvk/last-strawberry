import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import { notEmpty } from '@ember/object/computed';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  classNames: ['row', 'center'],
  classNameBindings: ['isSelected:selected'],

  hasLabel: notEmpty("label"),
  hasIcon: notEmpty("iconName"),

  shouldEnableTooltip: notEmpty("toolTipMessage"),

  @computed("selected")
  isSelected(val) {
    return (val === "true" || val === true);
  },

  @computed("isSelected", "selectedTooltipMessage", "unSelectedTooltipMessage")
  toolTipMessage(isSelected, selectedTooltipMessage, unSelectedTooltipMessage) {
    if(isSelected && isPresent(selectedTooltipMessage)) {
      return selectedTooltipMessage;
    }

    if(!isSelected && isPresent(unSelectedTooltipMessage)) {
      return unSelectedTooltipMessage;
    }

    return undefined;
  }
});
