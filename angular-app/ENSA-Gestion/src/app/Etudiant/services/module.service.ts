import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = 'http://localhost:8080/etudiant/modules';

  constructor(private http: HttpClient) {}

  getModules(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getMatieres(moduleId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${moduleId}/matieres`);
  }

  getCours(matiereId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/etudiant/modules/matieres/${matiereId}/cours`);
  }
  
}
