import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, dematerialize, from, materialize, of, throwError } from "rxjs";
import { User } from "src/app/features/auth/models/user";
import { UserFiles } from "src/app/features/auth/models/user-files";
import { userFiles } from "src/app/features/auth/store/selector/file-manager.selector";

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
            user = { ...user, id: lastUserIndex + 1 };
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return myObservable;
    }

    loginUser(email: string, password: string): User | null {
        const users: User[] = this.getUsers();
        const user: User | undefined = users.find(user => user.email === email && user.password === password);

        if (user) {
            return user;
        } else {
            return null;
        }
    }

    saveFiles(files: UserFiles) {
        let userFiles: UserFiles[] = JSON.parse(localStorage.getItem('userFile') as string);
        if (userFiles) {
            let userFile: UserFiles | undefined = userFiles.find(file => file.usedId === files.usedId);
            if (userFile) {
                userFile.files = userFile.files.concat(files.files);
            }
        } else {
            userFiles = [files];
        }
        localStorage.setItem('userFile', JSON.stringify(userFiles));
    }

    getFiles(userId: number) {
        let userFiles: UserFiles[] = JSON.parse(localStorage.getItem('userFile') as string);
        if (userFiles) {
            let userFile = userFiles.find(userFile => userFile.usedId === userId);
            if (userFile) {
                return this.ok(userFile);
            }
        }
        return this.error('Files not found')
    }

    deleteFiles(userId: number, fileName: string) {
        let usersFiles: UserFiles[] = JSON.parse(localStorage.getItem('userFile') as string);
        let index = usersFiles.findIndex(usersFile => usersFile.usedId === userId);
        if (usersFiles[index].files) {
            usersFiles[index].files = usersFiles[index].files.filter(file => file.fileName !== fileName)
            if(!usersFiles[index].files.length){
                usersFiles = usersFiles.filter(userFile => userFile.usedId !== userId);                
            }
            localStorage.setItem('userFile', JSON.stringify(usersFiles));
            return this.ok(usersFiles[index]);
        }
        return this.error('Files not found')
    }

    ok(body?: any) {
        return of(new HttpResponse({ status: 200, body }))
            .pipe(delay(500));
    }

    error(message: string) {
        return throwError(() => ({ error: { message } }))
            .pipe(materialize(), delay(500), dematerialize());
    }

}
