import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = 'http://localhost:8080/etudiant/modules';
  private coursApiUrl = 'http://localhost:8080/enseignant/cours';

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  //=========================== Les modules  ===============================================
  getModules(): Observable<any[]> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.httpClient.get<any[]>(this.apiUrl, { headers });
  }

  //================  get subjects (matières) for a module  ==============================
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

  //======================= get courses for a subject ===============================
  getCours(matiereId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Aucun token trouvé');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUrl}/matieres/${matiereId}/cours`;
    console.log('Fetching cours from:', url); // For debugging
    return this.httpClient.get<any[]>(url, { headers });
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  //=========================  get links by course ID  ========================================
  getLiensByCoursId(coursId: number): Observable<any[]> {
    // Check if we are in a browser environment
    if (typeof window === 'undefined') {
      throw new Error('localStorage is not available in non-browser environments');
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const url = `http://localhost:8080/etudiant/modules/matieres/cours/${coursId}/liens`;
    return this.httpClient.get<any[]>(url, { headers });
  }

  //=========================== get course details by ID ===============================

  getCoursById(coursId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Aucun token trouvé');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<any>(`${this.coursApiUrl}/${coursId}`, { headers });
  }



   //============================== récupérer les documents d'un cours ===========================

   getDocumentsByCoursId(coursId: number): Observable<any[]> {
    let token = null;

    // Vérifier si on est dans un environnement de navigateur
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    }

    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUrl}/matieres/cours/${coursId}/documents`;
    return this.httpClient.get<any[]>(url, { headers });
  }

  private baseUrl = 'http://localhost:8080/etudiant/modules/matieres/cours/documents'; 

   //================================== télécharger un document ==================================
   downloadDocument(documentId: number): Observable<HttpResponse<Blob>> {
    const url = `http://localhost:8080/etudiant/modules/matieres/cours/documents/download/${documentId}`;
    
    return this.httpClient.post<Blob>(url, null, {responseType: 'blob' as 'json', observe: 'response' });
  }
}
