# Instructions

## Tech Assessment: Todo App

*Objective*: Create a full-stack todo application that allows users to manage tasks across multiple categories. The
application should have a backend API built with Node.js and Express.js, and a frontend interface built with React.js andRedux Toolkit. Use TypeScript for both frontend and backend development.


### User Stories:

- As a user, I want to be able to create a new todo item with a title, description, and due date.
- As a user, I want to assign a category to each todo item.
- As a user, I want to view all my todo items grouped by their categories.
- As a user, I want to mark a todo item as complete or incomplete.
- As a user, I want to edit the details of an existing todo item.
- As a user, I want to delete a todo item.
- As a user, I want to create new categories for organizing my todo items.
- As a user, I want to filter todo items by their completion status (all, active, completed).
- As a user, I want to sort todo items by due date or creation date.


### Technical Requirements - Backend

- Backend (Node.js, Express.js, TypeScript):
- Set up a Node.js project with Express.js and TypeScript.
- Implement RESTful API endpoints for CRUD operations on todo items and categories.
- You can use an in memory db for the purposes of this app or tie into a tranditional db.
- Implement proper error handling and input validation.


### Server Requirements - Frontend

- Frontend (React.js, Redux w/ redux-toolkit, TypeScript):
- Set up a React project with TypeScript using vite
- Create components for displaying todo items, categories, and forms for adding/editing items.
- Implement Redux store and slices for managing application state.
- Submission Guidelines:
- Include a README.md file with instructions on how to set up and run the application locally.


# Evaluation Criteria:

- Code quality, organization, and adherence to TypeScript best practices.
- Proper implementation of Redux Toolkit for state management.
- RESTful API design and implementation.
- User interface design and responsiveness.
- Error handling and input validation.
- Bonus points for additional features or optimizations.

---

# Readme

## Makeen – Tech Assessment: Todo App

This is a full-stack Todo application built as a technical assessment.
Backend: Node.js, Express, TypeScript
Frontend: React, Redux Toolkit, TypeScript (initialized with Vite)
Uses an in-memory data store

### Requirements
Node.js (v18+ recommended)
npm

### Running the App

**Running the Backend**:
cd server
npm install
npm run dev

The Express API will start on:

http://localhost:3001

**Running the Frontend**
cd client
npm install
npm run dev

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