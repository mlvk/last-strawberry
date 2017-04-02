export function initialize(appInstance) {
  const service = appInstance.lookup('service:preferencesService');
  return service.startUp();
}

export default {
  name: 'preferences-service',
  initialize
};
