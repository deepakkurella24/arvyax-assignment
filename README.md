# ArvyaX Journal AI Assignment

## Live Demo

Frontend: https://arvyax-assignment-three.vercel.app
Backend: https://arvyax-assignment-djge.onrender.com

## Tech Stack

Frontend

* React
* Tailwind CSS
* Redux Toolkit
* Axios
* React Router

Backend

* Node.js
* Express
* MongoDB (Mongoose)
* JWT Authentication
* Groq LLM API

Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Features

### Authentication

* Signup and Login
* JWT cookie-based authentication
* Protected routes

### Journal System

* Create journal entries
* Store ambience and text
* Timestamped entries

### AI Emotion Analysis

* Uses Groq LLM to analyze journal text
* Extracts:

  * emotion
  * keywords
  * summary

### Insights Dashboard

* Total journal entries
* Most common emotion
* Most used ambience
* Recent keywords

---

## API Endpoints

### Auth

POST /auth/signup
Create new user

POST /auth/login
Login user

POST /auth/logOut
Logout user

GET /auth/check
Check authentication status

---

### Journal

POST /api/journal
Create journal entry with AI analysis

GET /api/journal/:userId
Get all journal entries

POST /api/journal/analyze
Run LLM emotion analysis

GET /api/journal/insights/:userId
Get analytics insights

---

## Installation (Local)

Backend

```
cd backend
npm install
npm start
```

Frontend

```
cd frontend/assignment
npm install
npm run dev
```

---

## Environment Variables

Backend `.env`

```
MONGO_URL=
JWT_SECRET=
GROQ_API_KEY=
```

---

## Author

Deepak Kurella
