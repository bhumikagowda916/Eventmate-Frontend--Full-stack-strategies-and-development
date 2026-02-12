import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });

    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of events', () => {
    const mockEvents = [
      { _id: '1', name: 'Test Event 1' },
      { _id: '2', name: 'Test Event 2' }
    ];

    service.getEvents(1, 10).subscribe((events: any[]) => {
      expect(events.length).toBe(2);
      expect(events[0].name).toBe('Test Event 1');
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

 it('should retrieve events with pagination parameters', () => {
  const mockEvents = [
    { _id: '10', name: 'Paged Event 1' }
  ];

  service.getEvents(2, 5).subscribe((events: any[]) => {
    expect(events.length).toBe(1);
    expect(events[0].name).toBe('Paged Event 1');
  });

  const req = httpMock.expectOne(
    request =>
      request.method === 'GET' &&
      request.urlWithParams.includes('page=2') &&
      request.urlWithParams.includes('limit=5')
  );

  req.flush(mockEvents);
});

});
