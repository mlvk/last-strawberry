module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    "no-unused-vars": ["error", { "varsIgnorePattern": "(computed|style)" }]
  },
  globals: {
    "document": true,
    "window": true,
    "moment": true,
    "_": true,
    "-Promise": true,
    "Immutable": true,
    "Rx": true,
    "S": true,
    "dragula": true,
    "$": true,
    "google": true,
    "Hammer": true,
    "console": true,
    "visit": true,
    "exists": true,
    "fillIn": true,
    "click": true,
    "keyEvent": true,
    "triggerEvent": true,
    "find": true,
    "findWithAssert": true,
    "wait": true,
    "DS": true,
    "andThen": true,
    "currentURL": true,
    "currentPath": true,
    "currentRouteName": true,
    "pauseTest": true,
    "server": true,
    "TweenMax": true,
    "Linear": true,
    "L": true,
    "numeral": true,
    "Firebase": true,
    "polyline": true,
    "selectChoose": true,
    "selectSearch": true,
    "R": true,
    "localforage": true
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
