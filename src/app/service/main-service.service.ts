import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

   apiUrl = 'http://localhost:3000/api/data'; // Replace with your API endpoint

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  setData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
