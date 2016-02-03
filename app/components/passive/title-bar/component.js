import Em from 'ember';
import computed from 'ember-computed-decorators';

const { computed: { notEmpty }} = Em;

export default Em.Component.extend({
  classNames: ['row', 'stretch'],
  hasAction: notEmpty('action'),
  hasIndex: notEmpty('index'),

  @computed('index')
  indexFormatted(index) {
    return S(index + 1).padLeft(2, '0').s;
  }
});
