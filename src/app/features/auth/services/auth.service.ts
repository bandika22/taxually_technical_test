import { Injectable } from '@angular/core';
import * as AuthActionTypes from '../store/action/auth.action'
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store) { }

  signUp(user: User) {
    let u: User = {
      email: 'asd',
      firstName: 'dsf',
      lastName: 'dfesw',
      password: 'ds',
      id: undefined
    }

    console.log('user', u);
    

    this.store.dispatch(AuthActionTypes.signup({ user: u }));
  }

  signupUser(user: User) {
    const myObservable: Observable<User> = from([user]);
    let users: User[] = [];

    console.log('useR: ', user);
    

    if(JSON.parse(localStorage.getItem('users') as string)){
      users = JSON.parse(localStorage.getItem('users') as string);
      const lastUserIndex: number | undefined =  users[users.length-1].id;      
      user = { ...user, id: lastUserIndex !== undefined && lastUserIndex >= 0 ? lastUserIndex + 1 : 0 };
    } else {
      user = { ...user, id: 0 };
    }
    
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return myObservable;
  }

}
