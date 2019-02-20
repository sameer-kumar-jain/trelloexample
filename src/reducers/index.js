/* @flow */

import { combineReducers } from 'redux';

import config from './config';

const reducers = {
  config
};

export type Reducers = typeof reducers;
export default combineReducers(reducers);
