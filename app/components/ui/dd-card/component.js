import Em from 'ember';
import style from 'last-strawberry/utils/styles';
import colors from 'last-strawberry/constants/colors';

export default Em.Component.extend({
  classNames: ['col'],
  attributeBindings:['componentStyles:style'],

  @style('backgroundColor')
  componentStyles(backgroundColor = colors.SKY_BLUE) {
    return {
      'background-color': backgroundColor
    };
  }
});
