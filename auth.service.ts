import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

/**
 * Provides authentication-related functionality for the application.
 *
 * This service handles user registration, login, logout,
 * and JSON Web Token (JWT) management.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Base URL of the authentication API.
   *
   * Used for sending login and registration requests
   * to the backend server.
   */
  private baseUrl = 'http://localhost:5001/auth';

  /**
   * Creates an instance of the AuthService.
   *
   * @param http Angular HttpClient used to communicate with the backend API
   */
  constructor(private http: HttpClient) {}

  /**
   * Registers a new user with the backend system.
   *
   * Sends the provided username and password to the
   * registration endpoint.
   *
   * @param username The username chosen by the user
   * @param password The password chosen by the user
   * @returns An Observable representing the registration request
   */
  register(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  /**
   * Authenticates a user using their credentials.
   *
   * On successful login, the returned JWT token
   * is stored in localStorage.
   *
   * @param username The user's username
   * @param password The user's password
   * @returns An Observable containing the authentication response
   */
  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap(res => localStorage.setItem('token', res.token))
      );
  }

  /**
   * Logs the user out of the application.
   *
   * Removes the stored authentication token
   * from localStorage.
   */
  logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * Retrieves the stored authentication token.
   *
   * @returns The JWT token if present, otherwise null
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Determines whether the user is currently authenticated.
   *
   * @returns True if a valid token exists, otherwise false
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
