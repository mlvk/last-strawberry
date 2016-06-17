import Ember from 'ember';
import style from 'last-strawberry/utils/styles';
import colors from 'last-strawberry/constants/colors';

const DDCardAddressComponent = Ember.Component.extend({
  classNames: ['col'],
  attributeBindings:['componentStyles:style'],

  @style('colorScheme.color')
  componentStyles(color = colors.DARK_GREY) {
    return {
      'color': color
    };
  }

});

DDCardAddressComponent.reopenClass({
  positionalParams: ['address']
});

export default DDCardAddressComponent;
