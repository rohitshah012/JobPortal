import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
    const { allJobs, jobsError, jobsLoading } = useSelector((state) => state.job);
    const featuredJobs = allJobs.slice(0, 6);

    return (
        <section className="featured-section" id="latest-jobs">
            <div className="section-heading">
                <div>
                    <span className="section-eyebrow">Fresh opportunities</span>
                    <h2>Roles worth a closer look</h2>
                    <p>Explore some of the latest opportunities from our hiring teams.</p>
                </div>
                <Link className="view-all-link" to="/jobs">View all jobs <ArrowRight size={17} /></Link>
            </div>

            {jobsLoading && featuredJobs.length === 0 ? (
                <div className="jobs-empty-state"><span className="loading-spinner" /> Finding the latest roles...</div>
            ) : jobsError && featuredJobs.length === 0 ? (
                <div className="jobs-empty-state jobs-error-state">{jobsError}</div>
            ) : featuredJobs.length === 0 ? (
                <div className="jobs-empty-state">
                    <BriefcaseBusiness size={25} />
                    <strong>New opportunities are on the way.</strong>
                    <span>Check back soon or browse all available roles.</span>
                </div>
            ) : (
                <div className="featured-grid">
                    {featuredJobs.map((job) => <LatestJobCard key={job._id} job={job} />)}
                </div>
            )}
        </section>
    );
};

export default LatestJobs;
