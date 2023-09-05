import { createReducer, on } from '@ngrx/store';
import * as AuthActionTypes from '../action/auth.action';
import { User } from '../../models/user';

export interface AuthState {
  user: User,
  users: User[],
  error: string | null;
  loggedInUser: User;
  loggedIn: boolean;
}

export const initialState: AuthState = {
  user: {} as User,
  users: [],
  error: null,
  loggedInUser: {} as User,
  loggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActionTypes.signupSuccess, (state, action) => ({
    ...state,
    error: null,
  })),
  on(AuthActionTypes.signupError, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AuthActionTypes.loadUsersSuccess, (state, action) => ({
    ...state,
    users: action.users
  })),
  on(AuthActionTypes.loginSuccess, (state, action) => ({
    ...state,
    loggedInUser: action.loggedInUser,
    loggedIn: true,
  })),
  on(AuthActionTypes.loginError, (state, action) => ({
    ...state,
    loggedIn: false,
    error: action.error
  })),
);