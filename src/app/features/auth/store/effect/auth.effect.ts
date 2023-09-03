import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActionTypes from '../action/auth.action';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class RegistrationEffects {

  constructor(
    private router: Router,
    private actions$: Actions,
    private apiSeervice: ApiService
  ) { }

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.signup),
      switchMap((action) => {
        return this.apiSeervice.signupUser(action.user)
          .pipe(
            tap(() => { this.router.navigate(['auth/login']); }),
            map(() => AuthActionTypes.signupSuccess()),
            catchError((error) => of(AuthActionTypes.signupError({ error: 'Registration failed' })))
          );
      })
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.loadUsers),
      switchMap((action, state) => {
        const users = this.apiSeervice.getUsers();
        return of(AuthActionTypes.loadUsersSuccess({users}));
      })
    )
  );

  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActionTypes.login),
    switchMap((action, state) => {
      const user = this.apiSeervice.loginUser(action.email, action.password);
      if(user){
        this.router.navigate(['home'])
        return of(AuthActionTypes.loginSuccess({loggedInUser: user}));
      }
      return of(AuthActionTypes.loginError({error: 'Wrong email or password!'}));
    })
  )
);
}
