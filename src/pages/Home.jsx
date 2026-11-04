
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TripPlanner from "../components/TripPlanner";

function Home({ user }) {
  return (
    <div id="top" className="min-h-screen bg-slate-50">
      <Navbar user={user} />

      <main>
        <Hero />

        <TripPlanner />

        {/* Why Choose Us Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-blue-600 font-bold tracking-widest text-sm uppercase">
                Why TripMate?
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Travel Planning Made Simple
              </h2>

              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Everything you need to plan a memorable journey, all in one place.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 hover:shadow-lg transition">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl">
                  ✨
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-6">
                  AI-Powered Itineraries
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  Get personalized day-wise travel plans generated according to your preferences.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-cyan-50 border border-cyan-100 hover:shadow-lg transition">
                <div className="w-14 h-14 rounded-2xl bg-cyan-600 text-white flex items-center justify-center text-2xl">
                  💰
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-6">
                  Budget-Friendly Trips
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  Plan your adventure based on your budget and travel requirements.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100 hover:shadow-lg transition">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl">
                  🌍
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-6">
                  Discover Destinations
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  Explore exciting destinations and find inspiration for your next journey.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div>
            <h2 className="text-2xl font-extrabold">
              Trip<span className="text-cyan-400">Mate.</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Your journey begins with a better plan.
            </p>
          </div>

          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} TripMate. All rights reserved.
          </p>

          <a
            href="#top"
            className="text-cyan-300 text-sm font-semibold hover:text-white transition"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
