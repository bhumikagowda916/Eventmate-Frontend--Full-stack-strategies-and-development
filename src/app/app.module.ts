import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventCreateComponent } from './events/event-create/event-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TestReportComponent } from './test-report/test-report.component';

/**
 * Root module of the Eventmate frontend application.
 *
 * This module declares and imports all core components,
 * services, and external libraries required to bootstrap
 * and run the application.
 */
@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventCreateComponent,
    LoginComponent,
    RegisterComponent,
    TestReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
