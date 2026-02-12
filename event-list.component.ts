import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { EventService } from '../event.service';
import { Event } from '../event.model';

/**
 * Displays a list of available events.
 *
 * This component retrieves event data from the EventService,
 * supports pagination and filtering, and renders event
 * summaries for user interaction, including map visualisation.
 */
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  /** List of events currently displayed to the user */
  events: Event[] = [];

  /** Complete list of events loaded from the backend */
  allEvents: Event[] = [];

  /** Current page number used for pagination */
  page = 1;

  /** Number of events retrieved per page */
  limit = 5;

  /** Indicates whether event data is currently being loaded */
  loading = false;

  /** Filter criteria applied to the event list */
  filters = {
    category: '',
    city: '',
    max_price: null as number | null
  };

  /** Indicates whether the user is currently searching/filtering */
  isSearching = false;

  /**
   * Creates an instance of the EventListComponent.
   *
   * @param eventService Service used to retrieve and manage event data
   * @param authService Service used to determine authentication state
   */
  constructor(
    private eventService: EventService,
    public authService: AuthService
  ) {}

  /**
   * Angular lifecycle hook that runs when the component is initialised.
   *
   * Loads the initial set of events from the backend.
   */
  ngOnInit(): void {
    this.loadEvents();
  }

  /**
   * Loads events from the backend API using pagination.
   *
   * Retrieved events are processed to prepare map data
   * and stored for filtering and display.
   */
  loadEvents(): void {
    this.loading = true;

    this.eventService.getEvents(this.page, this.limit).subscribe(data => {
      const enriched = data.map(event => this.prepareEvent(event));

      this.allEvents = [...this.allEvents, ...enriched];

      if (this.isSearching) {
        this.search();
      } else {
        this.events = [...this.allEvents];
      }

      this.loading = false;
    });
  }

  /**
   * Prepares an event object for frontend display.
   *
   * Converts GeoJSON location data into a Google Maps
   * compatible format and initialises UI-only properties.
   *
   * @param event The event to prepare
   * @returns The prepared event object
   */
  private prepareEvent(event: Event): Event {
    if (event.location?.coordinates?.length === 2) {
      const [lng, lat] = event.location.coordinates;

      return {
        ...event,
        mapCenter: { lat, lng },
        showMap: false
      };
    }

    return {
      ...event,
      showMap: false
    };
  }

  /**
   * Toggles the visibility of the Google Map for a specific event.
   *
   * @param event The event whose map visibility should be toggled
   */
  toggleMap(event: Event): void {
    event.showMap = !event.showMap;
  }

  /**
   * Loads the next page of events.
   *
   * Increments the page counter and retrieves additional
   * events from the backend API.
   */
  loadMore(): void {
    this.page++;
    this.loadEvents();
  }

  /**
   * Filters the loaded events based on user-defined criteria.
   *
   * Supports filtering by category, city, and maximum price.
   */
  search(): void {
    this.isSearching = true;

    this.events = this.allEvents.filter(event =>
      (!this.filters.category ||
        event.category.toLowerCase().includes(this.filters.category.toLowerCase())) &&
      (!this.filters.city ||
        event.city.toLowerCase().includes(this.filters.city.toLowerCase())) &&
      (!this.filters.max_price ||
        event.price <= this.filters.max_price)
    );
  }

  /**
   * Resets all search filters and restores the full event list.
   */
  reset(): void {
    this.isSearching = false;

    this.filters = {
      category: '',
      city: '',
      max_price: null
    };

    this.events = [...this.allEvents];
  }

  /**
   * Deletes an event by its unique identifier.
   *
   * Prompts the user for confirmation before sending
   * a delete request to the backend API.
   *
   * @param id The unique identifier of the event to delete
   */
  deleteEvent(id: string): void {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    this.eventService.deleteEvent(id).subscribe(() => {
      this.events = this.events.filter(e => e._id !== id);
      this.allEvents = this.allEvents.filter(e => e._id !== id);
    });
  }
}
