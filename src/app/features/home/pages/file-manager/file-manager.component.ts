import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent {
  files: any[] = [];

  fileUpload = this.fb.group({
    files: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder
  ) { }

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {    
    const files: Array<any> = $event;

    for (const file of files) {
      let type = file.type;
      if (type.includes('pdf') || type.includes('png') || type.includes('jpg')) {
        this.prepareFilesList(file);
      } else {
        console.log('nem jó a formátum');
      }
    };
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    for (const file of files.target.files) {
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

  get filesFromArray() {
    return this.fileUpload.controls["files"] as FormArray;
  }


  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.filesFromArray.controls.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.filesFromArray.controls[index].value.file.progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.filesFromArray.controls[index].value.file.progress += 5;
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
    const fileForm = this.fb.group({
      file
    });
    this.files.push(fileForm);
    this.filesFromArray.push(fileForm);
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
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  upload() {
    let byte = '';
    for (const file of this.filesFromArray.controls) {
      //this.uploadInProgress = true;

      const reader = new FileReader();

      reader.readAsDataURL(file.value.file);
      reader.onload = () => {
        if (file.value.file.type === 'application/pdf' || file.value.file.type === 'image/jpeg' || file.value.file.type === 'image/png' || file.value.file.type === 'image/jpg') {
          byte = (<string>reader.result).split(',')[1];
        }
      };
    }
  }

}
