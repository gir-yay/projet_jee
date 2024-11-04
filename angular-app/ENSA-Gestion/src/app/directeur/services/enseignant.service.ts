import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private apiUrl = 'http://localhost:8080/directeur/utilisateur';
  




  constructor(private httpClient: HttpClient) { }

  getEnseignants(): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Aucun token trouvé');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    return this.httpClient.get<any[]>(`${this.apiUrl}/enseignants`);
  }

  getMatiere(enseignantId : number): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Aucun token trouvé');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    return this.httpClient.get<any[]>(`${this.apiUrl}/enseignants/${enseignantId}/matiere`);
  }
}
