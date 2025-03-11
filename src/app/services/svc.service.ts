import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvcService {

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    let httpGet = this.http.get<T>(url);
    return httpGet;
  }

  post<TRequest,TResponse>(url: string, request: TRequest): Observable<TResponse> {
    let httpPost = this.http.post<TResponse>(url, request);
    return httpPost;
  }

}
