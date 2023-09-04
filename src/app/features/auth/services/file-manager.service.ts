import { Injectable } from '@angular/core';
import { UserFiles } from '../models/user-files';
import { Store } from '@ngrx/store';

import * as FileManagerTypes from '../store/action/file-manager.action';
import * as selectFileManagerhState from '../store/selector/file-manager.selector'
import { Subscription } from 'rxjs';
import { Files } from '../models/files';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  allUserSubscription!: Subscription;

  constructor(
    private store: Store
  ) { }

  saveFiles(files: Files[]) {
    const user: User = JSON.parse(localStorage.getItem('loggedInUser') as string);
    const userFiles: UserFiles = {
      usedId: user.id,
      files
    }
    this.store.dispatch(FileManagerTypes.saveFiles({ files: userFiles }));
  }

  loadUsers() {
    this.store.dispatch(FileManagerTypes.loadUserFiles());
  }

  getFiles() {
    let files: UserFiles = {} as UserFiles;
    this.allUserSubscription = this.store.select(selectFileManagerhState.userFiles).subscribe(
      f => files = f
    );
    return files;
  }
}
