import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webService } from './webServices';
import { Route, Router } from '@angular/router';
import { globalEnv } from '../shared/global-env.component';

@Injectable({providedIn: 'root'})
export class AuthService{
  constructor(
    private http: HttpClient,
    private router: Router,
    private web: webService){}
    private apiUrl = globalEnv.apiUrl;

  login(data: any) {
    return this.http.post<any>(`${this.apiUrl}/users/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      return payload.role;
    } catch (error) {
      return null;
    }
  }

  getUserId(): string | null {
  const token = this.getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id; // This matches the 'id' field you sign in user-route.js
  } catch (error) {
    return null;
  }
}

    getProfile(): Observable<any> {
      return this.web.webServiceRetrieve(`${this.apiUrl}/users/profile`);
    }
}
