import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const NotFound = () => (
    <div className="site-shell">
        <Navbar />
        <main className="not-found-page">
            <span className="not-found-icon"><Search size={27} /></span>
            <p className="section-eyebrow">404 · Page not found</p>
            <h1>This page took a different turn.</h1>
            <p>We couldn’t find the page you were looking for. Try returning home or exploring open roles.</p>
            <div className="not-found-actions">
                <Link to="/" className="not-found-home"><ArrowLeft size={16} /> Go home</Link>
                <Link to="/jobs" className="not-found-jobs">Browse jobs</Link>
            </div>
        </main>
        <Footer />
    </div>
);

export default NotFound;
