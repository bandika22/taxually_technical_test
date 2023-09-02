import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";

export enum AuthActionTypes {
    SIGNUP = '[Auth] User Sign Up',
    SIGNUP_SUCCESS = '[Auth] User Sign Up Success',
    SIGNUP_ERROR = '[Auth] User Sign Up Error'
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