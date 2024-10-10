import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/users';  

  constructor(private http: HttpClient) {}  

 
  addUser(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name });  
  }


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  
  }

  getUsersSorted(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/userssorted');  
  }
}
