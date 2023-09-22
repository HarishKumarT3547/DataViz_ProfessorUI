import { Component } from '@angular/core';
import { PythonModelService } from './python-model/python-model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProfessorUI';
  message: string = '';

// TODO: THIS DIV BLOCK IS JUST A TEST FOR PYTHON CONNECTION. MIGRATE THIS TO PREVIEW PAGE AFTER.
  constructor(private pythonModelService: PythonModelService) {}
  getMessage() {
    this.pythonModelService.getMessage().subscribe(data => {
      console.log(data.message)
      this.message = data.message;
    });
  }

  imageUrl: any;
  generateImage() {
    this.pythonModelService.generateImage().subscribe(
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
  }
}
