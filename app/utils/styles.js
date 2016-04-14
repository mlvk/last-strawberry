import Ember from 'ember';

const { computed, expandProperties, get } = Ember;

export default function style(...params) {
  // determine if user called as @style('blah', 'blah') or @style
  if (isDescriptor(params[params.length - 1])) {
    return handleDescriptor(...arguments);
  } else {
    return function(/* target, key, desc */) {
      return handleDescriptor(...arguments, params);
    };
  }
}

function handleDescriptor(target, key, desc, params = []) {
  return {
    enumerable: desc.enumerable,
    configurable: desc.configurable,
    writeable: desc.writeable,
    initializer: function() {
      let computedDescriptor;
      if (desc.writable) {
        computedDescriptor = callUserSuppliedGet(params, extractValue(desc));
      } else {
        throw new Error('Style decorator does not support using getters and setters');
      }

      return computed.apply(null, params.concat(computedDescriptor));
    }
  };
}

function expandPropertyList(propertyList) {
  return propertyList.reduce((newPropertyList, property) => {
    const atEachIndex = property.indexOf('.@each');
    if (atEachIndex !== -1) {
      return newPropertyList.concat(property.slice(0, atEachIndex));
    } else if (property.slice(-2) === '[]') {
      return newPropertyList.concat(property.slice(0, -3));
    }

    expandProperties(property, (expandedProperties) => {
      newPropertyList = newPropertyList.concat(expandedProperties);
    });

    return newPropertyList;
  }, []);
}

function buildStyles(data) {
  const str = Object.keys(data).reduce((acc, cur) => `${acc}${cur}:${data[cur]};`, '');
  return new Ember.String.htmlSafe(str);
}

function callUserSuppliedGet(params, func) {
  const expandedParams = expandPropertyList(params);
  return function() {
    let paramValues = expandedParams.map(p => get(this, p));
    let data = func.apply(this, paramValues);
    return buildStyles(data);
  };
}

function extractValue(desc) {
  return desc.value || (typeof desc.initializer === 'function' && desc.initializer());
}

function isDescriptor(item) {
  return item &&
    typeof item === 'object' &&
    'writable' in item &&
    'enumerable' in item &&
    'configurable' in item;
}
