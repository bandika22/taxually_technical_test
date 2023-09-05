import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActionTypes from '../action/auth.action';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class AuthEffects {

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
        return this.apiSeervice.getUsers()
        .pipe(
          map(response => AuthActionTypes.loadUsersSuccess({ users: response.body })),
          catchError((error) => of(AuthActionTypes.loginError({ error })))
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.login),
      switchMap((action, state) => {
        return this.apiSeervice.loginUser(action.email, action.password)
          .pipe(
            map(response => AuthActionTypes.loginSuccess({ loggedInUser: response.body })),
            tap( user => {
              this.router.navigate(['home']);
              localStorage.setItem('loggedInUser', JSON.stringify(user));
            }),
            catchError((error) => of(AuthActionTypes.loginError({ error })))
          );
      })
    )
  );
}
