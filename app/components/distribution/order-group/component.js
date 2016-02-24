import Em from 'ember';

const { computed: { alias, gt } } = Em;

export default Em.Component.extend({
  classNames: ['card-1'],
  attributeBindings: ['data-location-hash'],

  hasMultiple: gt('model.length', 1),
  location: alias('model.firstObject.location'),
  company: alias('location.company.name'),
  locationName: alias('location.name'),
  street: alias('location.address.street')
});
