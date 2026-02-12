import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

/**
 * Root component of the Eventmate frontend application.
 *
 * This component manages global application state
 * and provides logout functionality for authenticated users.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * Creates an instance of the AppComponent.
   *
   * @param authService Service used to manage authentication state
   * @param router Angular Router used for navigation
   */
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  /**
   * Logs the user out of the application.
   *
   * Clears authentication data and redirects
   * the user to the login page.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
