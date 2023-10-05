import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PythonModelService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // simple hello world from python
  getMessage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hello`);
  }

  // returns image response if file upload has been successful
  generateModelPreview(uploadedFile: File): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', uploadedFile);
    return this.http.post(`${this.apiUrl}/upload`, formData, {
      responseType: 'blob',
    });
  }
}