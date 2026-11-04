
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Account created successfully!");
      setIsError(false);

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      setMessage(error.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">

      {/* Left Image Section */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden bg-slate-900">

        <img
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200"
          alt="Beautiful travel destination"
          className="absolute inset-0 w-full h-full object-cover opacity-65"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-blue-950/40 to-transparent"></div>

        <div className="relative z-10 max-w-lg px-12 text-white">
          <Link to="/" className="text-3xl font-extrabold tracking-tight">
            ✈ TripMate
          </Link>

          <h1 className="text-5xl font-bold leading-tight mt-12">
            Your Next Adventure Starts Here.
          </h1>

          <p className="text-lg text-blue-100 mt-6 leading-relaxed">
            Create your account and let AI help you discover amazing
            destinations, plan smarter trips and explore the world.
          </p>

          <div className="mt-10 flex items-center gap-3 text-sm text-blue-100">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Your personal AI travel companion
          </div>
        </div>
      </div>

      {/* Right Registration Section */}
      <div className="flex items-center justify-center px-5 py-12 sm:px-10">

        <div className="w-full max-w-md">

          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-700 lg:hidden"
          >
            ✈ TripMate
          </Link>

          <div className="mt-8 lg:mt-0">

            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Get Started Today
            </p>

            <h2 className="text-4xl font-bold text-slate-900 mt-3">
              Create Account
            </h2>

            <p className="text-gray-500 mt-3 mb-8">
              Join TripMate and start planning your next journey.
            </p>

            <form onSubmit={handleRegister} className="space-y-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  minLength={6}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />

                <p className="text-xs text-gray-400 mt-2">
                  Password must contain at least 6 characters.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account →"}
              </button>

            </form>

            {message && (
              <div
                className={`mt-5 p-3 rounded-lg text-sm text-center ${
                  isError
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            <p className="text-center text-gray-500 mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                Login
              </Link>
            </p>

            <p className="text-center text-xs text-gray-400 mt-10">
              © 2026 TripMate. All rights reserved.
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Register;
