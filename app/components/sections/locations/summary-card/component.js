import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';

export default Component.extend({
  classNames: ['card-1', 'location'],

  hasName: notEmpty('name')
});
