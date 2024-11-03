import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private apiUrl = 'http://localhost:8080/directeur';
  constructor(private httpClient: HttpClient) { }

  getFormations(): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Aucun token trouvé');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    return this.httpClient.get<any[]>(`${this.apiUrl}/formation`, { headers });
  }

  ajouterFormation(formation: any): Observable<any> {
    const data = { nom: formation.nom, nbrSemestres: formation.nbrSemestres }; 
    return this.httpClient.post(`${this.apiUrl}/formation/ajouter`, data);
  }
}
