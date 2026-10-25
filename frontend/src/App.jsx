import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from './routing/ProtectedRoute'
import "./App.css";

const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Home = lazy(() => import("./pages/Home"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Browse = lazy(() => import("./pages/Browse"));
const Profile = lazy(() => import("./pages/Profile"));
const JobDescription = lazy(() => import("./pages/JobDescription"));
const Companies = lazy(() => import("./pages/admin/Companies"));
const CompanyCreate = lazy(() => import("./pages/admin/CompanyCreate"));
const CompanySetup = lazy(() => import("./pages/admin/CompanySetup"));
const AdminJobs = lazy(() => import("./pages/admin/AdminJobs"));
const PostJob = lazy(() => import("./pages/admin/PostJob"));
const Applicants = lazy(() => import("./pages/admin/Applicants"));
const JobSetup = lazy(() => import("./pages/admin/JobSetup"));
const NotFound = lazy(() => import("./components/NotFound"));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id",
    element:<ProtectedRoute><JobSetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
  {
    path: "*",
    element: <NotFound />
  },
])
function App() {

  return (
    <Suspense fallback={<div className="page-loading"><span className="loading-spinner" /> Loading JobPortal...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  )
}

export default App
