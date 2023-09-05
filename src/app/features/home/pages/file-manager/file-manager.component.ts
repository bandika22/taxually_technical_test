import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { Files } from 'src/app/features/auth/models/files';
import { UserFiles } from 'src/app/features/auth/models/user-files';
import { FileManagerService } from 'src/app/features/auth/services/file-manager.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;

  filterControl: FormControl<string> = new FormControl();

  files: any[] = [];
  userFiles!: UserFiles;
  dataSource!: MatTableDataSource<Files>;

  files$ = this.fileManagerService.getFiles().pipe(
    tap(userFiles => {
      if(userFiles){
        this.userFiles = userFiles;
        this.dataSource = new MatTableDataSource<Files>(userFiles.files);
        this.dataSource.sort = this.sort;
      }
    })
  );

  displayedColumns: string[] = ['fileName', 'fileType', 'action'];

  constructor(
    private fileManagerService: FileManagerService
  ) { }

  ngOnInit(): void {
    this.fileManagerService.loadFiles();
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

  applyFilter(value: string) {
    value = value.trim().toLowerCase();   
    this.dataSource.filter = value;
    
    this.dataSource.filterPredicate = (data, filter) => {      
      const value = data.fileName.toLowerCase();
      return value.includes(filter);
    };

  }
}
