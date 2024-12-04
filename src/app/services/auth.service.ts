import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Base URL for your backend API
  private jwtToken: string | null = null; // Store JWT token

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Register a new user
   * @param user Object containing user details
   * @returns Observable of the backend response
   */
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => new Error(error.error?.message || 'Registration failed'));
      })
    );
  }

  /**
   * Login a user and retrieve the JWT token
   * @param user Object containing username and password
   * @returns Observable containing the JWT token as a string
   */
  login(user: any): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/login`, user, { responseType: 'text' as 'json' }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error?.message || 'Login failed'));
      })
    );
  }

  /**
   * Store the JWT token
   * @param token JWT token string
   */
  setToken(token: string): void {
    this.jwtToken = token;
    localStorage.setItem('token', token);
  }

  /**
   * Retrieve the JWT token
   * @returns JWT token string or null if not available
   */
  getToken(): string | null {
    return this.jwtToken || localStorage.getItem('token');
  }

  /**
   * Logout the user by clearing the JWT token and redirecting
   */
  logout(): void {
    this.jwtToken = null;
    localStorage.removeItem('token');

    // Notify the backend of logout (optional)
    this.http.post(`${this.baseUrl}/logout`, {}).subscribe({
      next: () => console.log('Backend notified of logout successfully.'),
      error: (error) => console.error('Error notifying backend about logout:', error),
    });

    // Redirect to login page
    this.router.navigate(['/login']);
  }

  /**
   * Check if the user is logged in
   * @returns true if a JWT token exists
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  /**
   * Check if the user is authenticated (token exists and is not expired)
   * @returns true if authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false; // No token means the user is not authenticated
    }

    try {
      const decodedToken: any = jwtDecode(token); // Decode the JWT token
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decodedToken.exp && decodedToken.exp > currentTime; // Check if the token is expired
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }
}
