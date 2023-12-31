import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, dematerialize, from, materialize, of, tap, throwError } from "rxjs";
import { User } from "src/app/features/auth/models/user";
import { UserFiles } from "src/app/features/auth/models/user-files";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    getUsers() {
        const users: User[] = JSON.parse(localStorage.getItem('users') as string);

        if (users.length) {
            return this.ok(users);
        }

        return this.error('No registed user!');
    }

    signupUser(user: User) {
        let users: User[] = JSON.parse(localStorage.getItem('users') as string);

        if (users) {
            if (users.find(u => u.email === user.email)) {
                return this.error('An account is already registered with your email address. Please log in.');
            }
            const lastUserIndex: number = users[users.length - 1].id;
            user = { ...user, id: lastUserIndex + 1 };
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return this.ok(user);
    }

    loginUser(email: string, password: string) {
        const users: User[] = JSON.parse(localStorage.getItem('users') as string);

        if (!users.length) {
            return this.error('No user saved!');
        }

        const user: User | undefined = users.find(user => user.email === email && user.password === password);

        if (user) {
            return this.ok(user);
        } else {
            return this.error('Wrong email or password');
        }
    }

    saveFiles(files: UserFiles) {
        let userFiles: UserFiles[] = JSON.parse(localStorage.getItem('userFile') as string);
        if (userFiles && userFiles.length) {
            let index: number = userFiles.findIndex(file => file.usedId === files.usedId);
            userFiles[index].files = userFiles[index].files.concat(files.files);

        } else {
            userFiles = [files];
        }
        localStorage.setItem('userFile', JSON.stringify(userFiles));
        return this.ok(userFiles, 'File has been successfully saved');
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
            if (!usersFiles[index].files.length) {
                usersFiles = usersFiles.filter(userFile => userFile.usedId !== userId);
            }
            localStorage.setItem('userFile', JSON.stringify(usersFiles));
            return this.ok(usersFiles[index], 'File has been successfully deleted');
        }
        return this.error('Files not found')
    }

    ok(body?: any, message?: string) {
        return of(new HttpResponse({ status: 200, body, statusText: message }))
            .pipe(delay(500));
    }

    error(message: string) {
        return throwError(() => (message))
            .pipe(materialize(), delay(500), dematerialize());
    }

}
