import resolver from './helpers/resolver';
import "ember-data";
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);
