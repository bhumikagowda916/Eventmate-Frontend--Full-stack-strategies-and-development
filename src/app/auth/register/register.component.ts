import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

/**
 * Provides a registration interface for new users.
 *
 * This component collects user credentials and sends them
 * to the backend authentication service to create a new account.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  /** Username entered by the user */
  username = '';

  /** Password entered by the user */
  password = '';

  /** Error message displayed when registration fails */
  errorMessage = '';

  /**
   * Creates an instance of the RegisterComponent.
   *
   * @param authService Service used to register new users
   * @param router Angular Router used to navigate after registration
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Registers a new user using the provided credentials.
   *
   * On successful registration, the user is redirected
   * to the login page. If registration fails, an error
   * message is displayed.
   */
  register(): void {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Registration failed';
      }
    });
  }
}
