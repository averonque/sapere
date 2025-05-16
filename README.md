# Sapere Task Manager App

This project is a task management tool built with Laravel (backend) and Vue.js (frontend), separated into `api/` and `ui/` folders for clean architecture.

## Features
- Add/Edit/Delete Tasks
- Authenticated routes
- JSON API with Sanctum
- Vue 3 + Pinia frontend

## Setup Instructions
Check each `README.md` inside `api/` and `ui/` for detailed instructions.

## Built with Clean Code Principles
- RESTful API
- Eloquent Relationships
- Frontend Component Reuse
- Secure Authentication
- Follows Sapere Marketing standards


cd ui
npm install
npm run dev
Open browser at: http://localhost:5173

🔐 Authentication
Laravel Sanctum is used for token authentication.

After login, token is stored in localStorage and sent via Authorization headers.

All task routes are protected via middleware and require valid tokens.

📡 API Endpoints
Method	Endpoint	Description
GET	/api/tasks	List all user tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/{id}	Update task
DELETE	/api/tasks/{id}	Delete a task

📁 Code Quality & Organization
Modular controllers and models in Laravel

Pinia used for clean state management

Axios abstracts API calls

Each task-related logic resides in its own Vue component

