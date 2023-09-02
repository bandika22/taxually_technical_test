import { Injectable, OnDestroy } from '@angular/core';
import * as AuthActionTypes from '../store/action/auth.action';
import * as selectAuthState from '../store/selector/auth.selector'
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { Observable, Subscription, from } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SignUpForm } from '../pages/signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  allUserSubscription!: Subscription;

  constructor(
    private store: Store,
    private router: Router
    ) { }

  signUp(signUpForm: FormGroup<SignUpForm>) {
    let user: User = {
      email: signUpForm.controls.email.value,
      firstName: signUpForm.controls.firtName.value,
      lastName: signUpForm.controls.lastName.value,
      password: signUpForm.controls.password.value,
      id: undefined
    }

    this.store.dispatch(AuthActionTypes.signup({ user }));
  }

  signupUser(user: User) {
    const myObservable: Observable<User> = from([user]);
    let users: User[] = [];

    if (JSON.parse(localStorage.getItem('users') as string)) {
      users = JSON.parse(localStorage.getItem('users') as string);
      if(users.find(u => u.email === user.email)){
        console.log('ezzel az email-lel már regisztráltak!');
        return from([user]);
      }
      const lastUserIndex: number | undefined = users[users.length - 1].id;
      user = { ...user, id: lastUserIndex !== undefined && lastUserIndex >= 0 ? lastUserIndex + 1 : 0 };
    } else {
      user = { ...user, id: 0 };
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return myObservable;
  }

  login(email: string, password: string) {
    this.store.dispatch(AuthActionTypes.login({ email, password }));
  }

  getUsersFromLS() {
    return JSON.parse(localStorage.getItem('users') as string);;
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

  loginUser(email: string, password: string) {
    const users: User[] = this.getUsers();
  
    if (users.find(user => user.email === email && user.password === password)) {
      this.router.navigate(['home']);
      return from([null])
    } else {
      return from([null])
    }
  }



  ngOnDestroy(): void {
    if(this.allUserSubscription){
      this.allUserSubscription.unsubscribe();
    }
  }

}
