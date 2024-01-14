import { RootState } from 'types';
import { initialState } from '.';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state.auth || initialState;
export const selectAuth = createSelector([selectDomain], auth => auth);
