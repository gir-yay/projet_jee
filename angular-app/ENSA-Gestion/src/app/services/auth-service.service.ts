import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string, userType: string): Observable<any> {
    const credentials = { email, password, userType };
    return this.http.post(this.apiUrl, credentials);
  }
}
