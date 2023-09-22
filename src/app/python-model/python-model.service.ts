import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PythonModelService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }
  
  // simple hello world from python
  getMessage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hello`);
  }

  generateImage(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/generate_image`, { responseType: 'blob' });
  }
}