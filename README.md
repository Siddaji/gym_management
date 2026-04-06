# GymPro - Gym Management Dashboard

GymPro is a lightweight gym management dashboard built with React and Tailwind CSS. It provides member management, attendance tracking, and a clean dashboard experience backed by a simple Express API.

## Features

- Member directory with add and view capabilities
- Attendance tracker for daily gym check-ins
- Membership status and expiry indicators
- Responsive layout for desktop and mobile
- Local backend powered by Express

## Tech Stack

- Frontend: React 18, Vite, Tailwind CSS
- Backend: Node.js, Express
- Styling: Tailwind CSS and custom CSS utilities

## Setup

1. Start the backend:

```bash
cd backend
npm install
npm start
```

2. Start the frontend in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

3. Open the app in your browser:

```bash
http://localhost:3000
```

## API Proxy

The frontend is configured to proxy API requests from `/api` to the backend running on `http://localhost:3001`.

## Available Scripts

### Backend

- `npm start`: Run the backend Express server
- `npm run dev`: Run the backend with nodemon (if installed)

### Frontend

- `npm run dev`: Start the Vite development server
- `npm run build`: Build the frontend for production
- `npm run preview`: Preview the built frontend locally

## Project Structure

- `backend/` - Express API and mock member data
- `frontend/` - React application built with Vite
- `frontend/src/` - React components and pages
- `frontend/src/index.css` - Tailwind and custom styles

## Notes

- The backend currently uses in-memory member data and resets on restart.
- The project is designed as a local demo and can be extended with a database and authentication.

## License

MIT License
