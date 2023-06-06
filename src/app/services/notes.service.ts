import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../notes/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:3000/notes'; // Replace with your JSON Server endpoint

  constructor(private http: HttpClient) { }

  getEntriesByUsername(username: string): Observable<Note[]> {
    const url = `${this.apiUrl}?username=${username}`;
    return this.http.get<any>(url);
  }
  getNotes():Observable<Note[]>{
    return this.http.get<Note[]>(this.apiUrl);
  }
}
