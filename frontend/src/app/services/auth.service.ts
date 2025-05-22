import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<User | null> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('jwt_token', response.token);
      }),
      switchMap(() => this.loadUserProfile()),
      tap(user => {
        this.currentUserSubject.next(user);
      }),
      catchError(() => {
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  register(userData: { fullName: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  loadUserProfile(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, { headers });
  }

  getProfile(): Observable<User | null> {
    return this.loadUserProfile();
  }

  updateProfile(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, user).pipe(
      tap(() => this.currentUserSubject.next(user))
    );
  }

  forgotPassword(data: { email: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }
  
  resetPassword(data: { email: string; token: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
}
