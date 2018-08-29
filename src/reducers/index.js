/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import config from './config';

const reducers = {
  config,
  router
};

export type Reducers = typeof reducers;
export default combineReducers(reducers);
