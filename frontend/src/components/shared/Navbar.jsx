import { BriefcaseBusiness, LogOut, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/services/api";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRecruiter = user?.role === "recruiter";

    const closeMenu = () => setMenuOpen(false);
    const logout = async () => {
        setIsLoggingOut(true);
        try {
            const response = await api.get("/user/logout");
            if (!response.data.success) {
                throw new Error(response.data.message || "Logout failed.");
            }
            dispatch(setUser(null));
            closeMenu();
            navigate("/");
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message || "Logout failed.");
        } finally {
            setIsLoggingOut(false);
        }
    };

    const links = isRecruiter
        ? [{ to: "/admin/companies", label: "Companies" }, { to: "/admin/jobs", label: "Manage jobs" }]
        : [{ to: "/", label: "Home" }, { to: "/jobs", label: "Find jobs" }, { to: "/browse", label: "Browse" }];

    return (
        <header className="site-header">
            <div className="nav-inner">
                <Link className="brand" to="/" onClick={closeMenu} aria-label="FindOnlineJobs home">
                    <span className="brand-mark"><BriefcaseBusiness size={19} strokeWidth={2.4} /></span>
                    <span>FindOnline<span className="brand-accent">Jobs</span></span>
                </Link>

                <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`} aria-label="Main navigation">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === "/"}
                            onClick={closeMenu}
                            className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="nav-actions">
                    {user ? (
                        <>
                            {!isRecruiter && (
                                <Link className="profile-link" to="/profile" aria-label="View profile">
                                    {user.profile?.profilePhoto
                                        ? <img src={user.profile.profilePhoto} alt="" />
                                        : <UserRound size={18} />}
                                    <span>{user.fullname?.split(" ")[0] || "Profile"}</span>
                                </Link>
                            )}
                            <button className="nav-logout" onClick={logout} disabled={isLoggingOut} type="button" aria-label="Sign out">
                                <LogOut size={16} /> <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="nav-login" to="/login">Log in</Link>
                            <Link className="nav-signup" to="/signup">Create account</Link>
                        </>
                    )}
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMenuOpen((isOpen) => !isOpen)}
                    type="button"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
