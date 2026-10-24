import { ArrowRight, Code2, Database, Palette, Smartphone, Sparkles } from "lucide-react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilterLocation, setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    { label: "Frontend", icon: Code2 },
    { label: "Backend", icon: Database },
    { label: "Design", icon: Palette },
    { label: "Mobile", icon: Smartphone },
    { label: "Data & AI", icon: Sparkles },
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobs = (query) => {
        dispatch(setSearchedQuery(query));
        dispatch(setFilterLocation(""));
        navigate("/jobs");
    };

    return (
        <section className="category-section">
            <div className="category-inner">
                <div className="category-heading">
                    <span>Explore by expertise</span>
                    <h2>Where do you want to grow?</h2>
                </div>
                <div className="category-list">
                    {categories.map(({ label, icon: Icon }) => (
                        <button className="category-chip" key={label} onClick={() => searchJobs(label)} type="button">
                            <Icon size={18} />
                            {label}
                            <ArrowRight className="category-arrow" size={15} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryCarousel;