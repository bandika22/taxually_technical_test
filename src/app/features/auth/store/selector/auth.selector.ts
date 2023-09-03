import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducer/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const users = createSelector(
  selectAuthState,
  (state) => state.users
);

export const loggedIn = createSelector(
  selectAuthState,
  (state) => state.loggedIn
);
