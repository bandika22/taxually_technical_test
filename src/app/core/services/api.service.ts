import { Injectable } from "@angular/core";
import { Observable, from, of } from "rxjs";
import { User } from "src/app/features/auth/models/user";
import { UserFiles } from "src/app/features/auth/models/user-files";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    getUsers() {
        return JSON.parse(localStorage.getItem('users') as string);;
    }

    signupUser(user: User) {
        const myObservable: Observable<User> = from([user]);
        let users: User[] = JSON.parse(localStorage.getItem('users') as string);

        if (users) {
            if (users.find(u => u.email === user.email)) {
                return from([user]);
            }
            const lastUserIndex: number = users[users.length - 1].id;
            user = { ...user, id:  lastUserIndex + 1 };
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return myObservable;
    }

    loginUser(email: string, password: string): User | null {
        const users: User[] = this.getUsers();
        const user: User | undefined = users.find(user => user.email === email && user.password === password);
        let myObservable: Observable<User>;;

        if (user) {
            return user;
        } else {
            return null;
        }
    }

    saveFiles(files: UserFiles) {
        localStorage.setItem('files', JSON.stringify(files));
    }

    getFiles() {
        return JSON.parse(localStorage.getItem('files') as string);;
    }


}
