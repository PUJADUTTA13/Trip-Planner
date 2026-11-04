
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save login details
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update App.jsx user state
      onLogin(data.user);

      // Redirect to Home page
      navigate("/", { replace: true });

    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 min-h-[650px]">

        {/* Left Image Section */}
        <div className="hidden md:block relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200"
            alt="Beautiful travel destination"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-slate-900/20"></div>

          <div className="absolute top-10 left-10">
            <Link to="/" className="text-3xl font-extrabold text-white">
              Trip<span className="text-cyan-300">Mate.</span>
            </Link>
          </div>

          <div className="absolute bottom-12 left-10 right-10 text-white">
            <p className="text-cyan-300 font-bold text-sm tracking-widest uppercase">
              Your Journey Begins Here
            </p>

            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mt-4">
              Every journey
              <br />
              tells a story.
            </h2>

            <p className="text-white/80 mt-5 leading-relaxed max-w-md">
              Discover amazing destinations and create unforgettable
              travel experiences with your personal AI travel planner.
            </p>
          </div>
        </div>

        {/* Right Login Section */}
        <div className="flex items-center justify-center p-7 sm:p-12 md:p-14">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link to="/" className="md:hidden text-3xl font-extrabold text-gray-900">
              Trip<span className="text-blue-600">Mate.</span>
            </Link>

            <div className="mt-8 md:mt-0">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-7">
                ✈️
              </div>

              <p className="text-blue-600 font-bold text-sm tracking-widest uppercase">
                Welcome Back
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Sign in to your account
              </h1>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Enter your details to continue planning your next adventure.
              </p>
            </div>

            <form onSubmit={handleLogin} className="mt-9 space-y-6">

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:from-blue-800 hover:to-indigo-800 hover:-translate-y-0.5 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Signing In..." : "Sign In →"}
              </button>

            </form>

            {message && (
              <div
                className={`mt-5 p-3 rounded-xl text-sm text-center font-medium ${
                  isError
                    ? "bg-red-50 text-red-600 border border-red-100"
                    : "bg-green-50 text-green-700 border border-green-100"
                }`}
              >
                {message}
              </div>
            )}

            <p className="text-center text-gray-500 mt-8 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:text-blue-800 transition"
              >
                Create Account
              </Link>
            </p>

            <p className="text-center text-gray-400 text-xs mt-8">
              © {new Date().getFullYear()} TripMate. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
