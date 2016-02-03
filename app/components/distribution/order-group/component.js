import Em from 'ember';

const { computed: { alias } } = Em;

export default Em.Component.extend({
  classNames: ['card-1'],
  attributeBindings: ['data-location-hash'],

  client: alias('model.firstObject.client'),
  code: alias('client.code'),
  company: alias('client.company'),
  nickname: alias('client.nickname')
});
