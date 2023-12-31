import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from './file-upload.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { FileUpload } from '../models/file-upload';
import { AngularFireList } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {

  // Declaring variables
  lessonKey?: any;
  currentFile?: File;
  progress = 0;
  fileName = '';

  constructor(private fileUploadService: FileUploadService, private snackBarService: SnackbarService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getLessonKey();
    this.updatedbPath();
  }

  getLessonKey(): void {
    this._route.params.subscribe(params => {
      this.lessonKey = params['lessonId'];
      console.log(params);
    })
  }

  updatedbPath(): void {
    const path = `${this.lessonKey}`;
    this.fileUploadService.updatePath(path);
  }

  // Getting file details and dividing into variables
  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    }
    else {
      this.fileName = 'Select File';
    }
  }

  // Uploading file to firebase
  upload(): void {
    if (this.currentFile) {
        const currentFileUpload = new FileUpload(this.currentFile);
        this.fileUploadService.uploadFile(currentFileUpload).subscribe(
          percentage => {
            this.progress = Math.round(percentage ? percentage : 0);
            if(percentage == 100){
              this.snackBarService.showSnackbar("Successfully uploaded: " + this.currentFile?.name);
            }
          },
          error => {
            this.snackBarService.showSnackbar(error);
          },
        );
      }
  }
}
