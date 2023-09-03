import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { User } from "src/app/features/auth/models/user";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    getUsers() {
        return JSON.parse(localStorage.getItem('users') as string);;
    }

    signupUser(user: User) {
        const myObservable: Observable<User> = from([user]);
        let users: User[] = [];

        if (JSON.parse(localStorage.getItem('users') as string)) {
            users = JSON.parse(localStorage.getItem('users') as string);
            if (users.find(u => u.email === user.email)) {
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

    loginUser(email: string, password: string) {
        const users: User[] = this.getUsers();

        if (users.find(user => user.email === email && user.password === password)) {
            //this.router.navigate(['home']);
            return from([null])
        } else {
            return from([null])
        }
    }


}
