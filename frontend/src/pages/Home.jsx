import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import PopularCategories from "../components/PopularCategories";
import Footer from "../components/shared/Footer";
import HeroSection from "../components/HeroSection";
import LatestJobs from "../components/LatestJobs";
import Navbar from "../components/shared/Navbar";

const Home = () => {
    useGetAllJobs();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === "recruiter") {
            navigate("/admin/companies", { replace: true });
        }
    }, [navigate, user?.role]);

    return (
        <div className="site-shell">
            <Navbar />
            <main>
                <HeroSection />
                <PopularCategories />
                <LatestJobs />
            </main>
            <Footer />
        </div>
    );
};

export default Home;