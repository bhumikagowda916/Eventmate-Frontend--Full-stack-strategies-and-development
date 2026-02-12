# EventMate UI – Frontend Web Application

## Project Overview

EventMate UI is a frontend web application developed using Angular 16. 
The application provides the user interface for the EventMate system and communicates with the backend REST API to retrieve and display event data.

The project demonstrates structured frontend development using a component-based architecture and service-driven API integration.


---

## Objectives

This project was created to:

- Develop a modular frontend using Angular
- Implement component-based UI architecture
- Integrate RESTful API services
- Apply structured routing between views
- Maintain clean and organised project structure


---

## Technologies Used

- Angular CLI 16.2.16
- TypeScript
- HTML
- CSS
- Node.js
- npm
- Git & GitHub


---

## Application Structure

The project follows Angular’s recommended folder organisation.

The core application logic is located within the `src/app` directory and includes:

- Feature components for event management
- Service files for backend API communication
- Centralised routing configuration
- Root module setup

This separation improves maintainability by clearly dividing presentation logic and data-handling logic.


---

## Core Functionality

The frontend application provides:

- Dynamic event listing
- HTTP communication with backend services
- Structured navigation using Angular routing
- Reusable and modular component design


---

## API Communication

The frontend interacts with the EventMate backend using Angular’s HTTP Client module.

All API requests are handled inside dedicated service files to ensure separation of concerns and clean architecture.

The backend server must be running locally for the frontend to retrieve event data successfully.


---

## Installation and Setup

Clone the repository:

git clone https://github.com/bhumikagowda916/Eventmate-Frontend--Full-stack-strategies-and-development.git

Navigate into the project directory:

cd Eventmate-Frontend--Full-stack-strategies-and-development

Install dependencies:

npm install

Run the development server:

ng serve

The application will be available at:

http://localhost:4200/


---

## Build

To build the application for production:

ng build

The compiled files will be generated inside the `dist/` directory.


---

## Academic Context

This project was developed as part of the Full-Stack Strategies and Development module.

It demonstrates frontend engineering principles including modular design, API integration, structured routing, and maintainable Angular architecture.
