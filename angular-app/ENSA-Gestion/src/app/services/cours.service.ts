import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private baseApiUrl = 'http://localhost:8080/enseignant'; // Base URL for API

  constructor(private http: HttpClient) {}


  /*========================================= Les Cours======================= */

  // Cours par ID de Matieres
  getCoursByMatiereId(matiereId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/matiere/${matiereId}/cours`);
  }
  //ajouter cour
  ajouterCour(cours: any, matiereId: number): Observable<any> {
    const data = { nom: cours.nom, matiereId: matiereId };
    return this.http.post(`${this.baseApiUrl}/cours/ajouter`, data);
  }
   // cours par ID
   getCoursById(coursId: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/cours/${coursId}`);
  }
   //Modifier un cour
   updateCour(courId: number, courData: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/cours/modifier/${courId}`, courData);
  }
  // Supprimer un Cours
  deleteCour(courId: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/cours/${courId}`);
  }
/*=================================================================================================================== */
  /*========================================= Les Liens======================= */
  // liens par ID
  getLiensByCoursId(coursId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/cours/${coursId}/liens`);
  }
  // ajouter un lien
  ajouterLien(lien: string, coursId: number): Observable<any> {
    const data = { lien: lien, coursId: coursId }; // Envoie la chaîne de caractères directement dans `data`
    return this.http.post(`${this.baseApiUrl}/cours/liens/ajouter`, data);
  }
  //Supprimer un lien
  supprimerLien(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/cours/liens/${id}`);
  }
  // modifier un lien
  updatelien(lienId: number, lienData: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/cours/liens/modifier/${lienId}`, lienData);
  }
/*=================================================================================================================== */
  /*========================================= Les Documents======================= */

  // documents par ID
  getDocumentsByCoursId(coursId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/cours/${coursId}/documents`);
  }
  //ajouter document
  ajouterDocument(nom: string, courId: number, file: File): Observable<any> {
    const formData = new FormData();
    const documentData = {
        nom: nom,
        coursId: courId
    };
    console.log('Document Data:', documentData);
    formData.append('data', new Blob([JSON.stringify(documentData)], { type: 'application/json' }));
    formData.append('file', file);
    return this.http.post(`${this.baseApiUrl}/cours/documents/ajouter`, formData);
}
  // supprimer document
  supprimerDocument(documentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/cours/documents/${documentId}`);
  }
  //Modifier document
  updateDocument(id: number, nom: string, courId: number, file: File | null): Observable<any> {
    const formData = new FormData();
    const documentData = {
      nom: nom,
      coursId: courId
    };
    formData.append('data', new Blob([JSON.stringify(documentData)], { type: 'application/json' }));

    if (file) {
      formData.append('file', file); // Ajoute le fichier si disponible
    }
    else{
      formData.append('file', new File([], ''));
    }

    return this.http.post(`${this.baseApiUrl}/cours/documents/modifier/${id}`, formData);
  }
/*=================================================================================================================== */
/*  =================================Les Notes=========================== */
//Ajouter Notes
ajouterNotes(file: File, matiereId: number): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('matiereId', matiereId.toString());

  return this.http.post<any>(`${this.baseApiUrl}/notes/ajouter`, formData);
}

}
