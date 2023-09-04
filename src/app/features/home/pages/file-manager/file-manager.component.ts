import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs';
import { Files } from 'src/app/features/auth/models/files';
import { UserFiles } from 'src/app/features/auth/models/user-files';
import { FileManagerService } from 'src/app/features/auth/services/file-manager.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;

  files: any[] = [];
  userFiles!: UserFiles;
  files$ = this.fileManagerService.getFiles().pipe(
    tap(files => {
      this.userFiles = files;
    })
  );

  displayedColumns: string[] = ['fileName', 'fileType', 'action'];

  constructor(
    private fileManagerService: FileManagerService
  ) {
    this.fileManagerService.loadFiles();
  }

  ngOnInit(): void {
  }

  /**
   * on file drop handler
   */
  onFileDropped(files: any) {
    for (const file of files) {
      let type = file.type;
      if (this.userFiles.files.find(f => f.fileName === file.name)) {
        return;
      }
      if (type.includes('pdf') || type.includes('png') || type.includes('jpg')) {
        this.prepareFilesList(file);
      }
    };
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    for (const file of files.target.files) {
      if (this.userFiles.files.find(f => f.fileName === file.name)) {
        return;
      }
      this.prepareFilesList(file);
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(file: any) {
    file.progress = 0;
    this.addFiles(file);
    this.uploadFilesSimulator(0);
  }

  addFiles(file: any) {
    this.files.push(file);
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

  upload() {
    let byte = '';
    const files: Files[] = [];

    this.files.forEach((file, index) => {
      //this.uploadInProgress = true;

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        byte = (<string>reader.result).split(',')[1];
        const f: Files = {
          byteArray: byte,
          fileName: file.name,
          fileType: file.type
        };
        files.push(f);

        if (this.files.length - 1 === index) {
          this.fileManagerService.saveFiles(files);
          this.files = [];
        }

      };
    });
  }

  delete(fileName: string){
    this.fileManagerService.deleteFile(fileName);
  }
}
