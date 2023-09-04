import { Injectable, OnDestroy } from '@angular/core';
import * as AuthActionTypes from '../store/action/auth.action';
import * as selectAuthState from '../store/selector/auth.selector'
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { SignUpForm } from '../pages/signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  allUserSubscription!: Subscription;

  constructor(
    private store: Store,
    ) { }

  signUp(signUpForm: FormGroup<SignUpForm>) {
    let user: User = {
      email: signUpForm.controls.email.value,
      firstName: signUpForm.controls.firtName.value,
      lastName: signUpForm.controls.lastName.value,
      password: signUpForm.controls.password.value,
      id: 0
    }

    this.store.dispatch(AuthActionTypes.signup({ user }));
  }

  login(email: string, password: string) {
    this.store.dispatch(AuthActionTypes.login({ email, password }));
  }

  loadUsers() {
    this.store.dispatch(AuthActionTypes.loadUsers());
  }

  getUsers() {
    let users: User[] = [];
    this.allUserSubscription = this.store.select(selectAuthState.users).subscribe(
      u => users = u
    );

    return users;
  }

  ngOnDestroy(): void {
    if(this.allUserSubscription){
      this.allUserSubscription.unsubscribe();
    }
  }

}
