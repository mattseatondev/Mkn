# Technical Assessment: Todo App

This is a full-stack Todo application built as a technical assessment.
Backend: Node.js, Express, TypeScript
Frontend: React, Redux Toolkit, TypeScript (initialized with Vite)
Uses an in-memory data store

### Requirements
Node.js (v18+ recommended)
npm

### Running the App

**Running the Backend**:
``` bash
cd server
npm install
npm run dev
```

The Express API will start on:

http://localhost:3001

**Running the Frontend**
``` bash
cd client
npm install
npm run dev
```

The React app will start on:

http://localhost:5173


### Tech Stack

**Frontend**:

- Framework: React (Vite)
- Language: TypeScript
- State Management: Redux Toolkit & RTK Query
- Styling: CSS Modules
- Icons: react-icons

**Backend**

- Runtime: Node.js
- Framework: Express.js
- Language: TypeScript
- Database: In-memory DataStore


### Architectural Overview

**Backend Design**
The server is structured using a Layered Architecture pattern:

- Models: Define the TypeScript interfaces and data shapes for Todos and Categories.
- DataStore: Acts as the data access layer. It abstracts the in-memory database logic, ensuring that the controllers don't need to know how the data is physically stored or retrieved.
- Controllers: Contain the "brain" of the application. They handle request parsing, invoke the appropriate DataStore methods, and manage HTTP responses.
- Routes: Define the API surface area and map URIs to specific controller functions.
- Seeding: A dedicated initialization utility runs on server startup to populate the DataStore with default categories, ensuring a consistent user experience out of the box.

**Frontend Design**
The client is built with a Feature-Based structure:

- State Management: Powered by Redux Toolkit. I utilized RTK Query for the API layer to handle caching, loading states, and automatic re-fetching (cache invalidation via tags).
- Derived State: Instead of storing filtered lists in the state, I used Memoized Selectors to derive "Completed" vs "Pending" tasks on the fly, optimizing performance.
- Component Pattern: A mix of "Container" components (logic-heavy) and "Presentational" components (UI-focused) to keep the codebase dry and testable.


### API Endpoints

The server is equipped with several CRUD routes for selective to each entity (Todo;Category):

**Todo Routes**
- POST /todo - Adds a formatted Todo to the DataStore
- GET /todo - Retrieve all Todos
- GET /todo/:id - Retrieves a single Todo
- PUT /todo/:id - Updates a single Todo
- DELETE /todo/:id - Removes a single Todo

**Category Routes**
- POST /category - Adds a new Category to the DataStore
- GET /category - Retrieves all Categories
- GET /category/:id - Retrieves a single Category


### Notes

- The frontend communicates directly with the backend via REST APIs.
- Application state is managed using Redux Toolkit.
- Todos can be created, edited, deleted, completed, filtered, sorted, and grouped by category.
- Categories can be created and assigned to todos.
- All data is stored in-memory for simplicity.