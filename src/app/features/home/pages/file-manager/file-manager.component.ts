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

  onFileDropped(files: any) {
    this.fileManagerService.onFileDropped(files, this.userFiles, this.files);
  }

  fileBrowseHandler(event: any) {
    this.fileManagerService.fileBrowseHandler(event, this.userFiles, this.files);

  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  uploadFilesSimulator(index: number) {
   this.fileManagerService.uploadFilesSimulator(index, this.files);
  }

  formatBytes(bytes: any, decimals: any) {
    return this.fileManagerService.formatBytes(bytes, decimals)
  }

  upload() {
    this.fileManagerService.upload(this.files);
    this.files = [];
  }

  delete(fileName: string) {
    this.fileManagerService.deleteFile(fileName);
  }
}
