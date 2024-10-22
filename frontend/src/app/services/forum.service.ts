import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllSections(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sections`);
  }

  getPostsBySection(sectionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/sections/${sectionId}/posts`);
  }

  getPost(postId: string): Observable<any> {
    const headers = this.authService.createAuthHeaders();
    return this.http.get(`${this.apiUrl}/posts/${postId}`, { headers });
  }

  createComment(postId: string, commentData: any): Observable<any> {
    const headers = this.authService.createAuthHeaders(); 
    return this.http.post(`${this.apiUrl}/posts/${postId}/comments`, commentData, { headers });
  }

  createSection(sectionData: any): Observable<any> {
    const headers = this.authService.createAuthHeaders(); 
    return this.http.post(`${this.apiUrl}/sections`, sectionData, { headers });
  }

  createPost(sectionId: string, postData: any): Observable<any> {
    const headers = this.authService.createAuthHeaders(); 
    return this.http.post(`${this.apiUrl}/sections/${sectionId}/posts`, postData, { headers });
  }

  getSectionById(sectionId: string): Observable<any> {
    const headers = this.authService.createAuthHeaders(); 
    return this.http.get(`${this.apiUrl}/sections/${sectionId}`, { headers });
  }

getComments(postId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/posts/${postId}/comments`, { headers: this.authService.createAuthHeaders() });
}

}
