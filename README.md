# FindOnlineJobs

FindOnlineJobs is a React and Express job portal for candidates and recruiters. The frontend uses a responsive blue-and-white interface, Redux Toolkit for shared state, and a versioned REST API backed by MongoDB.

## Requirements

- Node.js 18 or newer
- npm
- MongoDB connection string
- Cloudinary credentials for profile and company uploads

## Run locally

1. Configure the backend:

   ```powershell
   cd backend
   Copy-Item .env.example .env
   ```

   Set `MONGO_URI`, `SECRET_KEY`, and the Cloudinary values in `backend/.env`.

2. Start the API:

   ```powershell
   npm install
   npm run dev
   ```

3. Configure and start the frontend in another terminal:

   ```powershell
   cd frontend
   Copy-Item .env.example .env
   npm install
   npm run dev
   ```

   Set `VITE_API_BASE_URL` if the API is not at `http://localhost:8000/api/v1`.

## Project structure

```text
findonlinejobs/
├── backend/
│   ├── config/          # Environment configuration
│   ├── controllers/     # HTTP handlers and request validation
│   ├── middlewares/     # Authentication, uploads, and shared error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Versioned REST route modules
│   ├── utils/           # Database and upload helpers
│   ├── app.js           # Express application and middleware
│   └── index.js         # Database connection and server startup
└── frontend/
    └── src/
        ├── components/  # Reusable presentation and UI components
        ├── config/      # Frontend configuration
        ├── hooks/       # Reusable React hooks
        ├── pages/       # Route-level views
        ├── redux/       # Shared application state
        ├── routing/     # Route access control
        ├── services/    # API client and feature API functions
        └── utils/       # Shared frontend helpers
```

## API

All endpoints are mounted under `/api/v1`:

| Area | Routes |
| --- | --- |
| Users | `/user` |
| Companies | `/company` |
| Jobs | `/job` |
| Applications | `/application` |

The API returns JSON with a `success` flag and a user-readable `message` for errors. Async controller failures and unknown routes are handled by shared Express middleware.

## Environment variables

Backend variables are documented in [backend/.env.example](./backend/.env.example). Frontend variables are documented in [frontend/.env.example](./frontend/.env.example). Do not commit `.env` files or production credentials.

## Validation

```powershell
cd frontend
npm run lint
npm run build
```
