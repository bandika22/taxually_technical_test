import { Injectable } from '@angular/core';
import { UserFiles } from '../models/user-files';
import { Store } from '@ngrx/store';

import * as FileManagerTypes from '../store/action/file-manager.action';
import * as selectFileManagerhState from '../store/selector/file-manager.selector'
import { Subscription, map } from 'rxjs';
import { Files } from '../models/files';
import { User } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';

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
    this.store.dispatch(FileManagerTypes.loadUserFiles({ userId: this.getUserId() }));
  }

  getFiles() {
    return this.store.select(selectFileManagerhState.userFiles);
  }

  getUserId() {
    const user: User = JSON.parse(localStorage.getItem('loggedInUser') as string);
    return user.id;
  }

  deleteFile(fileName: string) {
    this.store.dispatch(FileManagerTypes.deleteFile({ userId: this.getUserId(), fileName }));
  }

  upload(files: any) {
    let byte = '';
    const filesReq: Files[] = [];

    files.forEach((file: any, index: any) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        byte = (<string>reader.result).split(',')[1];
        const f: Files = {
          byteArray: byte,
          fileName: file.name,
          fileType: file.type
        };
        filesReq.push(f);

        if (files.length - 1 === index) {
          this.saveFiles(filesReq);
          files = [];
        }
      };
    });
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
 * Simulate the upload process
 */
  uploadFilesSimulator(index: number, files: any) {
    setTimeout(() => {
      if (index === files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1, files);
          } else {
            files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
* on file drop handler
*/
  onFileDropped(filesFromEvent: any, usersFiles: UserFiles, files: any) {
    for (const file of filesFromEvent) {
      let type = file.type;
      if (usersFiles?.files?.find(f => f.fileName === file.name)) {
        return;
      }
      if (type.includes('pdf') || type.includes('png') || type.includes('jpg')) {
        this.prepareFilesList(file, files);
      }
    };
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any, usersFiles: UserFiles, files: any) {
    console.log('files: ', files);
    
    for (const file of event.target.files) {
      if (usersFiles?.files?.find(f => f.fileName === file.name)) {
        return;
      }
      this.prepareFilesList(file, files);
    }
  }

    /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
    prepareFilesList(file: any, files: any) {
      file.progress = 0;
      files.push(file);
      this.uploadFilesSimulator(0, files);
      return files;
    }
}
