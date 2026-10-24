import { ArrowRight, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilterLocation, setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allJobs } = useSelector((state) => state.job);
    const companyCount = new Set(allJobs.map((job) => job.company?._id).filter(Boolean)).size;

    const searchJobs = (event) => {
        event.preventDefault();
        dispatch(setSearchedQuery(query.trim()));
        dispatch(setFilterLocation(location.trim()));
        navigate("/jobs");
    };

    return (
        <section className="hero-section">
            <div className="hero-glow hero-glow-one" aria-hidden="true" />
            <div className="hero-glow hero-glow-two" aria-hidden="true" />
            <div className="hero-content">
                <div className="hero-copy">
                    <span className="eyebrow"><Sparkles size={15} /> A clearer path to your next role</span>
                    <h1>Find work that<br />moves you <span>forward.</span></h1>
                    <p className="hero-description">
                        Explore opportunities from growing teams and established companies.
                        Your next chapter starts with the right search.
                    </p>

                    <form className="job-search-form" onSubmit={searchJobs}>
                        <label className="search-field">
                            <Search size={19} aria-hidden="true" />
                            <span className="sr-only">Job title or skill</span>
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Job title, skill or company"
                            />
                        </label>
                        <span className="search-divider" aria-hidden="true" />
                        <label className="search-field location-field">
                            <MapPin size={19} aria-hidden="true" />
                            <span className="sr-only">Location</span>
                            <input
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                                placeholder="City or remote"
                            />
                        </label>
                        <button className="search-submit" type="submit">
                            Find jobs <ArrowRight size={17} />
                        </button>
                    </form>

                    <div className="hero-trust">
                        <span><ShieldCheck size={16} /> Curated opportunities</span>
                        <span><strong>{allJobs.length.toLocaleString()}</strong> open roles</span>
                        <span><strong>{companyCount.toLocaleString()}</strong> hiring companies</span>
                    </div>
                </div>

                <aside className="hero-aside" aria-label="Career search highlight">
                    <div className="aside-topline"><span className="live-dot" /> Your next opportunity</div>
                    <div className="career-art" aria-hidden="true">
                        <div className="orbit orbit-one" />
                        <div className="orbit orbit-two" />
                        <div className="career-orb"><Search size={30} /></div>
                        <span className="career-star star-one">✦</span>
                        <span className="career-star star-two">✦</span>
                        <span className="career-dot dot-one" />
                        <span className="career-dot dot-two" />
                    </div>
                    <p className="aside-kicker">Make your next move count</p>
                    <h2>Good work starts with a great fit.</h2>
                    <p className="aside-copy">Search roles by what matters to you: the work, the place, and the people.</p>
                    <button className="aside-link" onClick={() => navigate("/jobs")} type="button">
                        Explore all jobs <ArrowRight size={16} />
                    </button>
                </aside>
            </div>
        </section>
    );
};

export default HeroSection;
