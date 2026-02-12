import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventCreateComponent } from './event-create.component';
import { FormsModule } from '@angular/forms';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
              HttpClientTestingModule,
              FormsModule
            ],
      declarations: [EventCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
