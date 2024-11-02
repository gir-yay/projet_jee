import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private baseApiUrl = 'http://localhost:8080/enseignant'; // Base URL for API

  constructor(private http: HttpClient) {}

  // Method to get courses by subject ID
  getCoursByMatiereId(matiereId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/matiere/${matiereId}/cours`); 
  }

  // Method to delete a course by its ID
  deleteCour(courId: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/cours/${courId}`); 
  }
   // Method to update a course by its ID
   updateCour(courId: number, courData: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/cours/modifier/${courId}`, courData); 
  }
  //ajouter cour
  ajouterCour(cours: any, matiereId: number): Observable<any> {
    const data = { nom: cours.nom, matiereId: matiereId }; 
    return this.http.post(`${this.baseApiUrl}/cours/ajouter`, data);
  }
   // Obtenir les détails du cours
   getCoursById(coursId: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/cours/${coursId}`);
  }
  // documents
  getDocumentsByCoursId(coursId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/cours/${coursId}/documents`); 
  }
  // liens
  getLiensByCoursId(coursId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/cours/${coursId}/liens`); 
  }
  //ajouter document 
  ajouterDocument(document: String, coursId: number): Observable<any> {
    const data = { nom:document, coursId: coursId };
    return this.http.post(`${this.baseApiUrl}/cours/documents/ajouter`, data); 
  }
  // Méthode pour ajouter un lien
  ajouterLien(lien: string, coursId: number): Observable<any> {
    const data = { lien: lien, coursId: coursId }; // Envoie la chaîne de caractères directement dans `data`
    return this.http.post(`${this.baseApiUrl}/cours/liens/ajouter`, data);
  }
  //Supprimer un lien
  supprimerLien(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/cours/liens/${id}`);
  }
  // Method to update a link
  updatelien(lienId: number, lienData: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/cours/liens/modifier/${lienId}`, lienData); 
  }
  // supprimer document
  supprimerDocument(documentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/cours/documents/${documentId}`);
  }
}