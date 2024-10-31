import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MatiereEnseignantService {
  private apiUrl = 'http://localhost:8080/enseignant/matiere';
  constructor(private http: HttpClient) {}

  getMatieres(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl, {
    });
  }
}
