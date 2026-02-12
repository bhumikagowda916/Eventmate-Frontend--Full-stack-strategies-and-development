import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

/**
 * Provides a form for creating new events.
 *
 * This component collects user input, constructs an event payload,
 * and submits it to the backend via the EventService.
 */
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {

  /** Form model used to capture user input for event creation */
  form = {
    name: '',
    city: '',
    category: '',
    date: '',
    price: undefined as number | undefined,
    available_seats: undefined as number | undefined,
    tags: '',
    longitude: undefined as number | undefined,
    latitude: undefined as number | undefined
  };

  /**
   * Creates an instance of the EventCreateComponent.
   *
   * @param eventService Service used to create new events
   * @param router Angular Router used to navigate after event creation
   */
  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  /**
   * Submits the event creation form.
   *
   * Validates required fields, constructs the event payload,
   * and sends the data to the backend API.
   */
  submit(): void {
    if (!this.form.name || !this.form.city || !this.form.category || !this.form.date) {
      return;
    }

    const payload = {
      name: this.form.name,
      city: this.form.city,
      category: this.form.category,
      date: this.form.date,
      price: this.form.price,
      available_seats: this.form.available_seats,
      tags: this.form.tags
        ? this.form.tags.split(',').map(tag => tag.trim())
        : [],
      location:
        this.form.longitude !== undefined && this.form.latitude !== undefined
          ? {
              type: 'Point' as const,
              coordinates: [
                this.form.longitude,
                this.form.latitude
              ] as [number, number]
            }
          : undefined
    };

    this.eventService.createEvent(payload).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
