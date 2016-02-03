import Em from 'ember';
import style from 'last-strawberry/utils/styles';

const { computed: { alias } } = Em;

export default Em.Component.extend({
  classNames: ['card-1'],
  attributeBindings: ['data-location-hash'],

  client: alias('model.visitWindow.client'),
  code: alias('client.code'),
  company: alias('client.company'),
  nickname: alias('client.nickname'),
  index: alias('model.position'),

  @style('colorScheme')
  textStyles(colorScheme = {color:'white'}) {
    return {
      'color':colorScheme.color
    }
  },

  actions: {
    resetDrop() {
      
    }
  }
});
