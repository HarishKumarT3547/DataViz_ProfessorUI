import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { PythonModelService } from '../python-model/python-model.service';
import { FileUpload } from '../models/file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {

  currentFile?: File;
  progress = 0;
  fileName = 'Select File';
  imageUrl: any; // for preview

  constructor(private fileUploadService: FileUploadService, private snackBarService: SnackbarService, private pythonModelService: PythonModelService) { }

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

        // 1. generate preview of point cloud model using PYTHON service
        this.pythonModelService.generateModelPreview(this.currentFile).subscribe(
          data => {
            try {
              this.imageUrl = URL.createObjectURL(data);
            } catch (error) {
              console.error("Failed to create image:", error);
            }
          },
          error => {
            console.error("HTTP Request Error:", error);
          }
        );

        // 2. after preview generation, pass in the file and preview thumbnail to FIREBASE
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
