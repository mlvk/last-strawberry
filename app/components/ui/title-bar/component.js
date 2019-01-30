import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  classNames: ['row'],
  hasAction: notEmpty('action'),
  hasIndex: notEmpty('index'),

  @computed('index')
  indexFormatted(index) {
    return S(index + 1).padLeft(2, '0').s;
  }
});
