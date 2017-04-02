import Ember from "ember";

export default Ember.Object.extend({
  maps: {
    places: {
      Autocomplete() {
        return {
          addListener() {},
          getPlace() {}
        }
      }
    },
    event: {
      clearInstanceListeners() {}
    }
  }
});
