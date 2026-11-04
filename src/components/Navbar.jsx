
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const username =
    user?.name ||
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Traveler";

  const handleHomeClick = (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSectionClick = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between">

        <a
          href="/"
          onClick={handleHomeClick}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
            ✈
          </div>

          <span className="text-2xl font-extrabold text-slate-900">
            Trip<span className="text-blue-600">Mate.</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">

          <a
            href="/"
            onClick={handleHomeClick}
            className="hover:text-blue-600 transition"
          >
            Home
          </a>

          <button
  onClick={() => handleSectionClick("destinations")}
  className="cursor-pointer hover:text-blue-600 transition"
>
  Destinations
</button>

          <button
            onClick={() => handleSectionClick("plan-trip")}
             className="cursor-pointer hover:text-blue-600 transition"
>
            Plan a Trip
          </button>

          {user && (
            <Link
              to="/my-trips"
              className="hover:text-blue-600 transition"
            >
              My Trips
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold uppercase">
                  {username.charAt(0)}
                </div>

                <span className="text-sm font-semibold text-slate-700 max-w-28 truncate">
                  {username}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-700 font-semibold hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
