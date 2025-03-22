import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7023/api/Auth';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let email=username;
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('refresh_token', response.refreshToken);
      })
    );
  }


  register(model:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, model ,{
      headers:new HttpHeaders({'content-type':'application/json'})
  });
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('refresh_token', response.refreshToken);
      })
    );
  }
  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  private storeToken(accessToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }
   getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
  private getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
