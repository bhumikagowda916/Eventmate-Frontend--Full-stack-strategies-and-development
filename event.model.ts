/**
 * Represents a review submitted for an event.
 */
export interface Review {

  /** Identifier of the user who submitted the review */
  user_id: number;

  /** Textual comment describing the user's experience */
  comment: string;

  /** Numeric rating given to the event (e.g. 1–5) */
  rating: number;

  /** Date when the review was submitted */
  date: string;
}

/**
 * Represents a geographic location for an event.
 */
export interface Location {

  /** GeoJSON type used for map rendering */
  type: 'Point';

  /** Longitude and latitude coordinates [lng, lat] */
  coordinates: [number, number];
}

/**
 * Represents an event within the Eventmate application.
 *
 * This interface defines the structure of event data exchanged
 * between the frontend and backend services.
 */
export interface Event {

  /** Unique identifier of the event */
  _id: string;

  /** Name or title of the event */
  name: string;

  /** City in which the event takes place */
  city: string;

  /** Category used to classify the event */
  category: string;

  /** Date on which the event occurs */
  date: string;

  /** Ticket price for attending the event */
  price: number;

  /** Number of seats currently available */
  available_seats: number;

  /** Tags used for searching and filtering events */
  tags: string[];

  /** Optional geographic location of the event */
  location?: Location;

  /** List of reviews submitted by users */
  reviews: Review[];

  /** Google Maps center position (frontend-only) */
  mapCenter?: any;

  /** Flag used to toggle map visibility in the UI */
  showMap?: boolean;
}
