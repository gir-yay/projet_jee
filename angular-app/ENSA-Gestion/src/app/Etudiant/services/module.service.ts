import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = 'http://localhost:8080/etudiant/modules';


  constructor(private httpClient: HttpClient) {}

  getModules() {
    let headers = new HttpHeaders();
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
        headers = headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    }
    return this.httpClient.get<any[]>(this.apiUrl, { headers });
}

getMatieres(moduleId: number): Observable<any[]> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Aucun token trouvé');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.httpClient.get<any[]>(`${this.apiUrl}/${moduleId}/matieres`, { headers });
}


getCours(matiereId: number): Observable<any[]> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Aucun token trouvé');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  const url = `${this.apiUrl}/matieres/${matiereId}/cours`;
  console.log('Fetching cours from:', url); // Affiche l'URL pour vérification
  return this.httpClient.get<any[]>(url, { headers });}
}
