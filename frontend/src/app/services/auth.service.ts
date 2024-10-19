import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; 
  private profileUrl = 'http://localhost:5000/api/profile'; 

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      catchError(error => {
        if (error.status === 409) { 
          return throwError('El usuario o el correo electrónico ya están en uso.');
        }
        return throwError('Error en el registro, inténtelo más tarde.');
      })
    );
  }
  

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    window.parent.postMessage({ type: 'user-updated' }, '*');
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {  
      return !!localStorage.getItem('token');
    }
    return false;  
  }
  

  logout(): void {
    localStorage.removeItem('token');
    window.parent.postMessage({ type: 'user-updated' }, '*');
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  getProfile(userId: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.profileUrl}/${userId}`, { headers });
  }

  updateProfile(userId: string, profileData: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.put(`${this.profileUrl}/${userId}`, profileData, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  
  getLoggedUser(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token); 
    }
    return null;
  }
}
