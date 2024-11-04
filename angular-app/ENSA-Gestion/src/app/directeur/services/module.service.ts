import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  

  private apiUrl = 'http://localhost:8080/directeur/formation';
  private apiUrl2 = 'http://localhost:8080/directeur';
  


  constructor(private httpClient: HttpClient) { }

  getModulesByFormation(formationId: number): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Aucun token trouvé');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    return this.httpClient.get<any[]>(`${this.apiUrl}/${formationId}/modules`);
  }

  get(formationId: number): Observable<any[]> {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('Aucun token trouvé');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    return this.httpClient.get<any[]>(`${this.apiUrl}/${formationId}`);
  }

  
  ajouterModule(module: any): Observable<any> {
    const data = { nom: module.nom, semestre: module.semestre , formationId : module.formationId }; 
    return this.httpClient.post(`${this.apiUrl2}/module/ajouter`, data);
  }
}
