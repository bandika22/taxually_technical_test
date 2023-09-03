import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";

export enum AuthActionTypes {
    SIGNUP = '[Auth] User Sign Up',
    SIGNUP_SUCCESS = '[Auth] User Sign Up Success',
    SIGNUP_ERROR = '[Auth] User Sign Up Error',
    LOAD_USERS = '[Auth] Load Users',
    LOAD_USERS_SUCCESS = '[Auth] User Loaded Success',
    LOGIN = '[Auth] User Login',
    LOGIN_SUCCESS = '[Auth] User Login Success',
    LOGIN_ERROR = '[Auth] User Login Error',
}

export const signup = createAction(
    AuthActionTypes.SIGNUP, props<{ user: User }>()
);

export const signupSuccess = createAction(
    AuthActionTypes.SIGNUP_SUCCESS
);

export const signupError= createAction(
    AuthActionTypes.SIGNUP_ERROR, props<{ error: string }>()
);

export const loadUsers = createAction(
    AuthActionTypes.LOAD_USERS
);

export const loadUsersSuccess = createAction(
    AuthActionTypes.LOAD_USERS_SUCCESS, props<{ users: User[] }>()
);

export const login = createAction(
    AuthActionTypes.LOGIN, props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
    AuthActionTypes.LOGIN_SUCCESS, props<{ loggedInUser: User }>()
);

export const loginError= createAction(
    AuthActionTypes.LOGIN_ERROR, props<{ error: string }>()
);