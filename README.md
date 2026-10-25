# JobPortal

**JobPortal** is a full-stack employment platform where candidates can discover and apply for roles, and recruiters can manage companies, job listings, and applications. The application pairs a responsive React interface with a modular REST API backed by MongoDB.

## Features

### For candidates

- Create an account and manage a professional profile
- Search and filter job listings
- Save jobs to revisit later
- Apply for roles and review application status
- Upload a profile image and resume

### For recruiters

- Create and manage company profiles
- Publish, edit, and remove job listings
- Review applicants and update application status

### Platform

- Responsive job-search interface
- Role-aware navigation and recruiter route protection
- Shared Redux Toolkit state with persisted user sessions
- Versioned REST API with centralized request validation and error responses
- HTTP security headers, request rate limiting, and MongoDB query sanitization

## Technology

| Area | Stack |
| --- | --- |
| Web client | React 18, Vite, React Router |
| UI | Tailwind CSS, Radix UI, Lucide |
| State | Redux Toolkit, React Redux, Redux Persist |
| HTTP | Axios |
| API | Node.js, Express 4 |
| Database | MongoDB, Mongoose |
| Authentication | JWT, HTTP-only cookies, bcrypt |
| Media uploads | Multer, Cloudinary |

## Requirements

- Node.js 18 or newer
- npm
- A reachable MongoDB database
- Cloudinary account credentials for profile and company media uploads

## Local development

Open two terminals from the project root.

### 1. Configure and start the API

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Edit `backend/.env` and set the required values:

| Variable | Required | Description |
| --- | --- | --- |
| `MONGO_URI` | Yes | MongoDB connection string |
| `SECRET_KEY` | Yes | Secret used to sign authentication tokens |
| `CLOUD_NAME` | For uploads | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | For uploads | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | For uploads | Cloudinary API secret |
| `PORT` | No | API port; defaults to `8000` |
| `CLIENT_URL` | No | Allowed frontend origin; defaults to `http://localhost:5173` |

The API starts at `http://localhost:8000` by default.

### 2. Configure and start the web client

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in `frontend/.env` if your API is not hosted at `http://localhost:8000/api/v1`.

Vite displays the frontend URL after startup (typically `http://localhost:5173`).

## Project layout

```text
JobPortal/
├── backend/
│   ├── config/              # Validated environment configuration
│   ├── controllers/         # Request handlers and domain operations
│   ├── middlewares/         # Authentication, uploads, async and error handling
│   ├── models/              # Mongoose data models
│   ├── routes/              # REST endpoints, composed by API version
│   ├── utils/               # Database and media helpers
│   ├── app.js               # Express app configuration
│   └── index.js             # Database connection and server startup
└── frontend/
    └── src/
        ├── components/      # Reusable UI and presentation components
        ├── config/           # Frontend environment configuration
        ├── hooks/            # Shared React hooks
        ├── pages/            # Route-level screens
        ├── redux/            # Application state and store
        ├── routing/          # Route access control
        ├── services/         # HTTP client and API services
        └── utils/            # Shared frontend utilities
```

## API overview

The API is versioned under `/api/v1`.

| Resource | Base path | Examples |
| --- | --- | --- |
| Users | `/user` | Register, sign in, update profile, save jobs |
| Companies | `/company` | Register, retrieve, update, and remove companies |
| Jobs | `/job` | Search, publish, update, and remove jobs |
| Applications | `/application` | Apply, retrieve applicants, and update status |

Authenticated endpoints use the HTTP-only `token` cookie. API errors return JSON with `success: false` and a descriptive `message`.

## Scripts

Run these commands from the relevant package directory.

**Frontend**

```powershell
npm run dev
npm run lint
npm run build
npm run preview
```

**Backend**

```powershell
npm run dev
npm start
```

## Configuration and security

- Local secrets belong in `backend/.env`; frontend build-time settings belong in `frontend/.env`.
- Use the corresponding `.env.example` files as templates.
- Never commit real credentials or production secrets.
- The API restricts cross-origin requests using `CLIENT_URL`; configure it for the deployed frontend.
- Use HTTPS and a suitably strong `SECRET_KEY` in production. Configure cookie settings to match the production deployment’s domain and cross-site requirements.

## Notes

- The backend connects to MongoDB before accepting requests. Verify `MONGO_URI` and database network access if startup fails.
- Profile and company uploads require valid Cloudinary configuration.
- The backend package does not currently define an automated test suite.
