import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:8080/directeur/utilisateur';
  constructor(private httpClient: HttpClient) { }


  getEtudiants(): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Aucun token trouvé');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    return this.httpClient.get<any[]>(`${this.apiUrl}/etudiants`, { headers });
  }

}