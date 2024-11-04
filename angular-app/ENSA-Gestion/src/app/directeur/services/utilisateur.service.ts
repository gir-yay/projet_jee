import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }


  private apiUrl = 'http://localhost:8080/directeur/utilisateur/ajouter'; 
  private apiUrl2 = "http://localhost:8080/directeur/utilisateur/archiver";


  ajouterUtilisateur(file: File, type:any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
  
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }

  archiverUtilisateur(user: any): Observable<any> {
      const data = { type: user.type, id : user.id }; 
      return this.http.post(`${this.apiUrl2}`, data);
  }
}
