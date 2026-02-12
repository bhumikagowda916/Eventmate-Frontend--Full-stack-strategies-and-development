import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

/**
 * Provides a login interface for existing users.
 *
 * This component authenticates users using the AuthService
 * and manages navigation after successful or failed login attempts.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /** Username entered by the user */
  username = '';

  /** Password entered by the user */
  password = '';

  /** Error message displayed when authentication fails */
  errorMessage = '';

  /**
   * Creates an instance of the LoginComponent.
   *
   * @param authService Service used to authenticate users
   * @param router Angular Router used for navigation after login
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Authenticates the user using the provided credentials.
   *
   * On successful login, the user is redirected to the
   * main event listing page. If authentication fails,
   * an error message is displayed.
   */
  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
