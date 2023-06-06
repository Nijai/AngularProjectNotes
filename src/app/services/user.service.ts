import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/notes'; // Replace with your JSON Server endpoint

  constructor(private http: HttpClient) { }

  addUser(username: string, password: string): Observable<any> {
    const entries:any = [];
    const user = { username, password, entries };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, user, { headers });
  }
  getUserByUsername(username: any): Observable<any> {
    const url = `${this.apiUrl}?username=${username}`;
      return this.http.get<any>(url);
    
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getNotes(url:any): Observable<any> {
    return this.http.get<any>(url);
  }

  addNoteToUser(id: number, note: any): Observable<any> {
    console.log("Inside addNoteToUser "+id);
    console.log(note);
    const url = `${this.apiUrl}/${id}`;
    console.log("url: "+url);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, note , { headers });

  }
}