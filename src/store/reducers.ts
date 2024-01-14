import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from 'utils/types/injector-typings';
import { authReducer } from './slice/auth';

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducers = combineReducers({
    auth: authReducer,
  });

  return rootReducers;
}
