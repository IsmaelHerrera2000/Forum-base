import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private profileUrl = 'http://localhost:5000/api/profile';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      catchError((error) => {
        if (error.status === 409) {
          return throwError(
            'El usuario o el correo electrónico ya están en uso.'
          );
        }
        return throwError('Error en el registro, inténtelo más tarde.');
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      window.parent.postMessage({ type: 'user-updated' }, '*');
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      window.parent.postMessage({ type: 'user-updated' }, '*');
    }
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getProfile(userId: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.profileUrl}/${userId}`, { headers });
  }

  updateProfile(userId: string, profileData: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.put(`${this.profileUrl}/${userId}`, profileData, {
      headers,
    });
  }

  createAuthHeaders(): HttpHeaders {
    const token = this.getToken(); 
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    } else {
      return new HttpHeaders();
    }
  }
  

  getLoggedUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        return jwtDecode(token);
      }
    }
    return null;
  }

  deleteProfile(userId: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.delete(`${this.profileUrl}/${userId}`, { headers });
  }

  getAllUsers(page: number = 1, pageSize: number = 10): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`http://localhost:5000/api/users?page=${page}&pageSize=${pageSize}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener usuarios:', error);
        return throwError('No se pudieron obtener los usuarios.');
      })
    );
  }

  addUser(userData: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post('http://localhost:5000/api/users', userData, { headers });
  }
  
  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.role === 'admin';
      }
    }
    return false;
  }
  
}
