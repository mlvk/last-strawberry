module.exports = function() {
  return {
    clientAllowedKeys: [
      'ROUTIFIC_API_KEY',
      'API_ENDPOINT',
      'QUOTE_SERVICE_KEY',
      'GOOGLE_CLIENT_ID',
      'GOOGLE_API_KEY',
      'FIREBASE_URL',
      'TEST_FIREBASE_URL'
    ],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: false,
  };
};
