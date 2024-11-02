import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getNotes(): Observable<any> {
    // Vérifier si window et localStorage sont disponibles
    const token = typeof window !== 'undefined' && localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:8080/etudiant/notes`, { headers });
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); // If you store user role
  }
  
}
