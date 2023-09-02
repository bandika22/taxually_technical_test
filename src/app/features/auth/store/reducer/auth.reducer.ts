import { createReducer, on } from '@ngrx/store';
import * as AuthActionTypes from '../action/auth.action';
import { User } from '../../models/user';

export interface AuthState {
  user: User,
  users: User[],
  error: string | null;
}

export const initialState: AuthState = {
  user: {} as User,
  users: [],
  error: null,
};

export const signupReducer = createReducer(
  initialState,
  on(AuthActionTypes.signupSuccess, (state, action) => ({
    ...state,
    error: null,
  })),
  on(AuthActionTypes.signupError, (state, action) => ({
    ...state,
    error: action.error,
  }))
);