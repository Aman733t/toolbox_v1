import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public headers: HttpHeaders = new HttpHeaders()
  public baseUrl: string = 'http://localhost:9555/api/';
  private _refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) { }

  refreshNeeded() {
    return this._refreshNeeded;
  }

  getHeaders() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Cache-Control', 'no-cache');
    headers = headers.append('Pragma', 'no-cache');
    headers = headers.append('Expires', '0');
    return headers;
  }

  nunjucksValidator(json:any,nunjucks:any){
    return this.http.post(this.baseUrl + 'nunjucksValidator',{json:json,nunjucks:nunjucks}, { headers: this.getHeaders() })
  }



}
