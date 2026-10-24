import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const LatestJobCards = ({ job }) => (
    <Link className="featured-card" to={`/description/${job._id}`}>
        <div className="featured-card-top">
            <span className="company-avatar">
                {job.company?.logo
                    ? <img src={job.company.logo} alt="" />
                    : <BriefcaseBusiness size={19} />}
            </span>
            <span className="card-arrow"><ArrowUpRight size={17} /></span>
        </div>
        <p className="company-name">{job.company?.name || "Hiring company"}</p>
        <h3>{job.title}</h3>
        <p className="job-location"><MapPin size={15} /> {job.location || "Location not specified"}</p>
        <div className="job-card-divider" />
        <div className="job-card-meta">
            <span>{job.jobType || "Full time"}</span>
            {job.salary ? <span>{job.salary} LPA</span> : null}
        </div>
    </Link>
);

export default LatestJobCards;
