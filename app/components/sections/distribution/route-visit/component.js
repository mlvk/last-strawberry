import Em from 'ember';
import style from 'last-strawberry/utils/styles';
import computed from 'ember-computed-decorators';

const { computed: { alias } } = Em;

export default Em.Component.extend({
  classNames: ['card-1'],
  attributeBindings: ['data-location-hash'],

  location: alias('model.visitWindow.location'),
  company: alias('location.company'),
  index: alias('model.position'),

  @computed('model.fulfillments.[]')
  size(fulfillments) {
    return fulfillments.get('length');
  },

  @style('colorScheme')
  textStyles(colorScheme = {color:'white'}) {
    return {
      'color':colorScheme.color
    }
  }
});
