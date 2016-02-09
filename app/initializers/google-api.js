// import ENV from "last-strawberry/config/environment";
// import Ember from 'ember';

export function initialize(/*application*/) {
  // application.deferReadiness();
  // var url = `https://maps.googleapis.com/maps/api/js?key=${ENV.googleApi.accessToken}&libraries=places&callback=initGoogleApi`;
  //
  // window.initGoogleApi = function(){
  //   application.advanceReadiness();
  // }
  //
  // Ember.$.getScript(url);
}

export default {
  name: 'google-api',
  initialize: initialize
};
