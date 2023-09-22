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

  // TODO: move this service to where it's needed e.g. image preview page
  constructor(private pythonModelService: PythonModelService) {}
  getMessage() {
    this.pythonModelService.getMessage().subscribe(data => {
      console.log(data.message)
      this.message = data.message;
    });
  }
}
