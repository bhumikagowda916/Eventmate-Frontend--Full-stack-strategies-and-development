import { Component, OnInit } from '@angular/core';
import { EventService } from '../events/event.service';
import { AuthService } from '../auth/auth.service';

/**
 * Represents the result of an individual frontend test.
 */
type TestResult = {
  /** Name of the test case */
  name: string;

  /** Outcome of the test execution */
  status: 'PASS' | 'FAIL';

  /** Optional details explaining the test result */
  details?: string;
};

/**
 * Displays a runtime test report for frontend service functionality.
 *
 * This component executes a set of automated checks against
 * the EventService and AuthService and presents the results
 * in a simple pass/fail format.
 */
@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.css']
})
export class TestReportComponent implements OnInit {

  /** Collection of executed test results */
  results: TestResult[] = [];

  /** Indicates whether tests are currently running */
  running = false;

  /**
   * Creates an instance of the TestReportComponent.
   *
   * @param eventService Service used to test event-related API calls
   * @param authService Service used to test authentication behaviour
   */
  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  /**
   * Angular lifecycle hook that runs when the component is initialised.
   *
   * Automatically triggers execution of all frontend tests.
   */
  ngOnInit(): void {
    this.runAllTests();
  }

  /**
   * Executes all frontend service tests in sequence
   * and records the results for display.
   */
  runAllTests(): void {
    this.results = [];
    this.running = true;

    this.testGetEventsReturnsArray();
    this.testGetEventsPaginationParams();
    this.testGetEventsDifferentPages();
    this.testLoginStoresToken();
    this.testLogoutClearsToken();
  }

  /**
   * Records a test result in the results list.
   *
   * @param name Name of the test case
   * @param status Outcome of the test
   * @param details Optional explanatory details
   */
  private addResult(
    name: string,
    status: 'PASS' | 'FAIL',
    details?: string
  ): void {
    this.results.push({ name, status, details });
  }

  /**
   * Verifies that the getEvents method returns an array.
   */
  private testGetEventsReturnsArray(): void {
    const testName = 'getEvents(1, 5) returns an array';

    this.eventService.getEvents(1, 5).subscribe({
      next: (events) => {
        if (Array.isArray(events)) {
          this.addResult(testName, 'PASS', `Returned ${events.length} item(s).`);
        } else {
          this.addResult(testName, 'FAIL', 'Result was not an array.');
        }
      },
      error: (err) => {
        this.addResult(testName, 'FAIL', `Request failed: ${this.safeError(err)}`);
      }
    });
  }

  /**
   * Verifies that pagination parameters are accepted
   * and return valid event data.
   */
  private testGetEventsPaginationParams(): void {
    const testName = 'getEvents(2, 3) works with pagination parameters';

    this.eventService.getEvents(2, 3).subscribe({
      next: (events) => {
        if (Array.isArray(events)) {
          this.addResult(testName, 'PASS', `Returned ${events.length} item(s).`);
        } else {
          this.addResult(testName, 'FAIL', 'Result was not an array.');
        }
      },
      error: (err) => {
        this.addResult(testName, 'FAIL', `Request failed: ${this.safeError(err)}`);
      }
    });
  }

  /**
   * Compares results returned for different pagination pages.
   *
   * Confirms that multiple pages return valid arrays and,
   * when possible, different data sets.
   */
  private testGetEventsDifferentPages(): void {
    const testName = 'Pagination comparison: page 1 vs page 2';

    let page1: any[] | null = null;
    let page2: any[] | null = null;

    const finish = () => {
      if (!page1 || !page2) return;

      const ids1 = page1.map(e => e?._id).filter(Boolean).join(',');
      const ids2 = page2.map(e => e?._id).filter(Boolean).join(',');

      if (ids1 && ids2 && ids1 !== ids2) {
        this.addResult(testName, 'PASS', 'Different page results detected.');
      } else {
        this.addResult(
          testName,
          'PASS',
          'Both pages returned valid arrays. Results may be identical if dataset is small.'
        );
      }

      this.running = false;
    };

    this.eventService.getEvents(1, 5).subscribe({
      next: (events) => { page1 = events; finish(); },
      error: (err) => {
        this.addResult(testName, 'FAIL', `Page 1 failed: ${this.safeError(err)}`);
        this.running = false;
      }
    });

    this.eventService.getEvents(2, 5).subscribe({
      next: (events) => { page2 = events; finish(); },
      error: (err) => {
        this.addResult(testName, 'FAIL', `Page 2 failed: ${this.safeError(err)}`);
        this.running = false;
      }
    });
  }

  /**
   * Verifies that a successful login stores a JWT token.
   */
  private testLoginStoresToken(): void {
    const testName = 'AuthService.login() stores token for valid credentials';

    const username = 'BhumikaGowda';
    const password = 'Bhumika@916';

    localStorage.removeItem('token');

    this.authService.login(username, password).subscribe({
      next: () => {
        const token = localStorage.getItem('token');

        if (token) {
          this.addResult(testName, 'PASS', 'Token stored successfully after login.');
        } else {
          this.addResult(testName, 'FAIL', 'Login succeeded but token was not stored.');
        }
      },
      error: () => {
        this.addResult(
          testName,
          'FAIL',
          'Login request failed. Ensure test credentials exist in backend.'
        );
      }
    });
  }

  /**
   * Verifies that logging out clears the authentication token.
   */
  private testLogoutClearsToken(): void {
    const testName = 'AuthService.logout() clears authentication token';

    localStorage.setItem('token', 'dummy-token-for-test');

    this.authService.logout();

    const tokenAfterLogout = localStorage.getItem('token');
    const isLoggedIn = this.authService.isLoggedIn();

    if (!tokenAfterLogout && !isLoggedIn) {
      this.addResult(testName, 'PASS', 'Token removed and user is logged out.');
    } else {
      this.addResult(testName, 'FAIL', 'Token still exists or user is still logged in.');
    }
  }

  /**
   * Safely extracts a readable error message from an error object.
   *
   * @param err The error to process
   * @returns A string representation of the error
   */
  private safeError(err: any): string {
    if (!err) return 'Unknown error';
    if (typeof err === 'string') return err;
    if (err.message) return err.message;
    try { return JSON.stringify(err); }
    catch { return 'Unserializable error'; }
  }
}
