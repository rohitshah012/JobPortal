import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
    <footer className="site-footer">
        <div className="footer-inner">
            <Link className="brand footer-brand" to="/">
                <span className="brand-mark"><BriefcaseBusiness size={19} strokeWidth={2.4} /></span>
                <span>FindOnline<span className="brand-accent">Jobs</span></span>
            </Link>
            <p>Helping good people find work that feels right.</p>
            <div className="footer-links">
                <Link to="/jobs">Explore jobs <ArrowUpRight size={14} /></Link>
                <Link to="/signup">Join the community <ArrowUpRight size={14} /></Link>
            </div>
            <span className="footer-copyright">© {new Date().getFullYear()} FindOnlineJobs</span>
        </div>
    </footer>
);

export default Footer;
