import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = env.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getMapGroups(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mapGroups`);
  }

  submitForm(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/elParamsList`, data);
  }

  getFormData(): Observable<any> {
    return this.http.get('../../api/customer-new.json');
  }

}
