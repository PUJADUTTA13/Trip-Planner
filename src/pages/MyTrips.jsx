
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MyTrips({ user }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/trips/my-trips",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch trips.");
      }

      setTrips(data.trips || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/trips/${tripId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete trip.");
      }

      setTrips((prev) => prev.filter((trip) => trip._id !== tripId));

      if (selectedTrip?._id === tripId) {
        setSelectedTrip(null);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const username =
    user?.name || user?.email?.split("@")[0] || "Traveler";

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest">
            Your Travel Collection
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            My <span className="text-blue-400">Trips</span>
          </h1>

          <p className="text-slate-300 mt-4 max-w-xl">
            Welcome, {username}! Explore and manage all your
            saved travel itineraries in one place.
          </p>

          <Link
            to="/"
            className="inline-flex mt-7 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition"
          >
            + Plan a New Trip
          </Link>
        </div>
      </section>

      {/* Trips Section */}
      <section className="max-w-7xl mx-auto px-5 py-14">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-9">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Your Saved Journeys
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              {trips.length} saved {trips.length === 1 ? "trip" : "trips"}
            </p>
          </div>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 mt-5">
              Loading your trips...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5">
            {error}
            <button
              onClick={fetchTrips}
              className="ml-3 underline font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && trips.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 text-center py-20 px-6">
            <div className="text-6xl mb-5">✈️</div>

            <h3 className="text-2xl font-bold text-slate-900">
              No Saved Trips Yet
            </h3>

            <p className="text-slate-500 mt-3 max-w-md mx-auto">
              Your travel adventures will appear here once
              you save an AI-generated itinerary.
            </p>

            <Link
              to="/"
              className="inline-block mt-7 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-bold transition"
            >
              Create Your First Trip →
            </Link>
          </div>
        )}

        {!loading && !error && trips.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition"
              >
                <div
                  className="h-44 bg-cover bg-center relative"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(15,23,42,0.75), rgba(15,23,42,0.15)), url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900')",
                  }}
                >
                  <div className="absolute bottom-5 left-5">
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">
                      Saved Destination
                    </p>
                    <h3 className="text-2xl font-extrabold text-white mt-1">
                      {trip.destination}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">
                        Duration
                      </p>
                      <p className="font-bold text-slate-800 mt-1">
                        {trip.days} Days
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">
                        Travelers
                      </p>
                      <p className="font-bold text-slate-800 mt-1">
                        {trip.travelers} People
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">
                        Budget
                      </p>
                      <p className="font-bold text-slate-800 mt-1">
                        {trip.budget}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">
                        Travel Style
                      </p>
                      <p className="font-bold text-slate-800 mt-1">
                        {trip.travelStyle}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 mt-6 pt-5 flex gap-3">
                    <button
                      onClick={() =>
                        setSelectedTrip(
                          selectedTrip?._id === trip._id ? null : trip
                        )
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition"
                    >
                      {selectedTrip?._id === trip._id
                        ? "Close Details"
                        : "View Itinerary"}
                    </button>

                    <button
                      onClick={() => handleDelete(trip._id)}
                      className="px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Trip Details */}
      
{/* Selected Trip Details - Premium Design */}
{selectedTrip && (
  <div className="mt-14 scroll-mt-24">

    {/* Destination Cover */}
    <div
      className="relative min-h-[320px] md:min-h-[400px] rounded-t-3xl overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(15,23,42,0.95), rgba(15,23,42,0.35)), url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1800')",
      }}
    >
      <div className="min-h-[320px] md:min-h-[400px] flex flex-col justify-end p-7 md:p-12">

        <span className="bg-white/15 border border-white/20 text-white text-xs font-bold tracking-widest uppercase rounded-full px-4 py-2 w-fit backdrop-blur-sm">
          ✦ Your Saved Travel Plan
        </span>

        <p className="text-blue-200 text-sm font-semibold mt-7 uppercase tracking-widest">
          Your destination
        </p>

        <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-2 break-words">
          {selectedTrip.destination}
        </h2>

        <p className="text-slate-200 mt-4 max-w-xl leading-relaxed">
          Your personalized journey, saved and ready to explore.
          Here is your complete travel itinerary.
        </p>
      </div>
    </div>

    {/* Trip Information Cards */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 bg-white border-x border-slate-200 p-4 md:p-6">

      {[
        {
          icon: "⌖",
          label: "Destination",
          value: selectedTrip.destination,
          color: "bg-blue-100 text-blue-700",
        },
        {
          icon: "▦",
          label: "Duration",
          value: `${selectedTrip.days} Days`,
          color: "bg-indigo-100 text-indigo-700",
        },
        {
          icon: "♧",
          label: "Travelers",
          value: `${selectedTrip.travelers} People`,
          color: "bg-cyan-100 text-cyan-700",
        },
        {
          icon: "₹",
          label: "Travel Budget",
          value: selectedTrip.budget,
          color: "bg-emerald-100 text-emerald-700",
        },
        {
          icon: "✧",
          label: "Travel Style",
          value: selectedTrip.travelStyle,
          color: "bg-violet-100 text-violet-700",
        },
      ].map((item) => (
        <div
          key={item.label}
          className="rounded-2xl bg-slate-50 border border-slate-100 p-5"
        >
          <div className={`w-10 h-10 flex items-center justify-center rounded-xl text-xl ${item.color}`}>
            {item.icon}
          </div>

          <p className="text-xs text-slate-400 font-bold uppercase mt-4">
            {item.label}
          </p>

          <p className="font-bold text-slate-900 mt-1 break-words">
            {item.value}
          </p>
        </div>
      ))}
    </div>

    {/* Main Itinerary Layout */}
    <div className="bg-white border border-slate-200 rounded-b-3xl shadow-sm p-5 md:p-9">

      <div className="grid lg:grid-cols-[1fr_290px] gap-10">

        {/* Itinerary Content */}
        <div className="min-w-0">

          <div className="mb-8">
            <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">
              Your travel schedule
            </p>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
              Your Itinerary
            </h3>

            <p className="text-slate-500 text-sm mt-2">
              Explore your saved day-wise travel recommendations.
            </p>
          </div>

          <div className="text-[15px] md:text-base leading-8 break-words
            [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h1]:mt-10 [&_h1]:mb-5
            [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:pb-3 [&_h2]:border-b [&_h2]:border-slate-100
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mt-7 [&_h3]:mb-3
            [&_p]:text-slate-600 [&_p]:my-4
            [&_strong]:font-bold [&_strong]:text-slate-900
            [&_ul]:space-y-3 [&_ul]:my-5 [&_ul]:pl-6 [&_ul]:list-disc
            [&_ol]:space-y-3 [&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal
            [&_li]:text-slate-600 [&_li]:leading-7
            [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:bg-blue-50 [&_blockquote]:rounded-r-xl [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:my-6
            [&_table]:w-full [&_table]:text-sm
            [&_th]:bg-slate-100 [&_th]:p-4 [&_th]:text-left
            [&_td]:p-4 [&_td]:border-b [&_td]:border-slate-100
            [&_a]:text-blue-600 [&_a]:underline"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {selectedTrip.itinerary}
            </ReactMarkdown>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">

          <div className="bg-slate-950 text-white rounded-2xl p-6">

            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">
              Trip Overview
            </p>

            <h4 className="text-xl font-bold mt-3">
              Your Journey
            </h4>

            <div className="mt-6 space-y-5">

              {[
                ["Destination", selectedTrip.destination],
                ["Duration", `${selectedTrip.days} days`],
                ["Travelers", selectedTrip.travelers],
                ["Budget", selectedTrip.budget],
                ["Travel Style", selectedTrip.travelStyle],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="text-slate-400">{label}</span>
                    <span className="font-semibold text-right break-words">
                      {value}
                    </span>
                  </div>
                  <div className="h-px bg-white/10 mt-4"></div>
                </div>
              ))}

            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6">
            <div className="w-11 h-11 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center text-xl">
              ✦
            </div>

            <h4 className="font-bold text-slate-900 mt-4">
              Travel Smart
            </h4>

            <p className="text-sm text-slate-500 leading-6 mt-2">
              Review local travel conditions, timings and expenses
              before confirming your plans.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <p className="text-sm font-bold text-blue-900">
              Saved AI Travel Plan
            </p>

            <p className="text-xs text-blue-700 leading-6 mt-2">
              Your itinerary is saved in your TripMate account.
              You can revisit it whenever you need.
            </p>
          </div>

        </aside>
      </div>

      {/* Bottom Action */}
      <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">

        <div>
          <h4 className="font-bold text-slate-900">
            Planning another adventure?
          </h4>

          <p className="text-sm text-slate-500 mt-1">
            Explore more destinations with TripMate AI.
          </p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">

          <Link
            to="/"
            className="flex-1 text-center px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition"
          >
            Plan Another Trip →
          </Link>

          <button
            onClick={() => setSelectedTrip(null)}
            className="px-5 py-3.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold transition"
          >
            Close
          </button>

        </div>
      </div>

    </div>
  </div>
)}


      </section>
    </div>
  );
}

export default MyTrips;
