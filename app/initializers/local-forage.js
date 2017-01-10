export function initialize() {
  localforage.config({
    driver      : localforage.LOCALSTORAGE,
    name        : "last-strawberry",
    version     : 1.0,
    storeName   : "web_data", // Should be alphanumeric, with underscores.
    description : "Web data"
  });
}

export default {
  name: "local-forage",
  initialize
};
