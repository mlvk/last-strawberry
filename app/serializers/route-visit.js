import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  serialize(/*snapshot, options*/) {
    const json = this._super(...arguments);

    // These are derived values on the server and should not be sent back.
    delete json.data.attributes['fulfillment-count'];
    delete json.data.attributes['has-pickup'];
    delete json.data.attributes['has-drop'];

    return json;
  }
});
