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
    const userFiles: UserFiles = {
      usedId: this.getUserId(),
      files
    }
    this.store.dispatch(FileManagerTypes.saveFiles({ files: userFiles }));
  }

  loadFiles() {
    this.store.dispatch(FileManagerTypes.loadUserFiles({userId: this.getUserId()}));
  }

  getFiles() {
    return this.store.select(selectFileManagerhState.userFiles);
  }

  getUserId(){
    const user: User = JSON.parse(localStorage.getItem('loggedInUser') as string);
    return user.id;
  }

  deleteFile(fileName: string) {
    this.store.dispatch(FileManagerTypes.deleteFile({userId: this.getUserId(), fileName}));
  }
}
