import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event.model';
import { AuthService } from '../auth/auth.service';

/**
 * EventService provides communication between the Angular frontend
 * and the Eventmate backend API.
 *
 * It is responsible for retrieving, searching, creating,
 * and deleting event data via HTTP requests.
 */
@Injectable({
  providedIn: 'root'
})
export class EventService {

  /**
   * Base URL of the Eventmate events API.
   *
   * All event-related HTTP requests are built using this URL.
   */
  private apiUrl = 'http://localhost:5001/events';

  /**
   * Creates an instance of the EventService.
   *
   * @param http Angular HttpClient used to send HTTP requests
   * @param authService Service used to retrieve authentication tokens
   */
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Retrieves a paginated list of events from the backend API.
   *
   * Pagination parameters are passed as query parameters.
   *
   * @param page The page number requested by the client
   * @param limit The maximum number of events per page
   * @returns An Observable containing an array of Event objects
   */
  getEvents(page: number, limit: number): Observable<Event[]> {
    return this.http.get<Event[]>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    );
  }

  /**
   * Searches for events based on optional filter criteria.
   *
   * Filters are converted into query parameters and sent
   * to the backend search endpoint.
   *
   * @param filters An object containing optional search filters
   * such as category, city, and maximum price
   * @returns An Observable containing a filtered array of events
   */
  searchEvents(filters: {
    category?: string;
    city?: string;
    max_price?: number;
  }): Observable<Event[]> {

    const params: string[] = [];

    if (filters.category) {
      params.push(`category=${filters.category}`);
    }

    if (filters.city) {
      params.push(`city=${filters.city}`);
    }

    if (filters.max_price !== undefined) {
      params.push(`max_price=${filters.max_price}`);
    }

    const queryString = params.length ? `?${params.join('&')}` : '';

    return this.http.get<Event[]>(`${this.apiUrl}/search${queryString}`);
  }

  /**
   * Creates a new event in the backend system.
   *
   * This method requires authentication and sends
   * a JWT token in the Authorization header.
   *
   * @param event A partial Event object containing event details
   * @returns An Observable containing the newly created event
   */
  createEvent(event: Partial<Event>): Observable<Event> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<Event>(this.apiUrl, event, { headers });
  }

  /**
   * Deletes an existing event by its unique identifier.
   *
   * This operation is protected and requires a valid JWT token.
   *
   * @param eventId The unique identifier of the event to delete
   * @returns An Observable indicating the result of the delete operation
   */
  deleteEvent(eventId: string): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/${eventId}`, { headers });
  }
}
