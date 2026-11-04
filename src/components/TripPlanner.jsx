
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import destinations from "../data/destinations";
import DestinationCard from "./DestinationCard";

function TripPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [travelStyle, setTravelStyle] = useState("");

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setItinerary("");
    setError("");
    setSaveMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/trips/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination,
            days,
            budget,
            travelers,
            travelStyle,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Trip generation failed");
      }

      setItinerary(data.itinerary);

      setTimeout(() => {
        document.getElementById("generated-trip")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setSaveMessage("Please login to save your trip.");
      return;
    }

    setSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/trips/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            destination,
            days,
            budget,
            travelers,
            travelStyle,
            itinerary,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save trip.");
      }

      setSaveMessage(
        "Trip saved successfully! You can find it in My Trips."
      );
    } catch (err) {
      setSaveMessage(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition";

  const markdownComponents = {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-10 mb-5">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-slate-900 mt-10 mb-5 pb-3 border-b border-slate-100">
        <span className="w-1.5 h-7 bg-blue-600 rounded-full"></span>
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-lg font-bold text-slate-800 mt-7 mb-3">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="text-slate-600 leading-8 my-4">{children}</p>
    ),

    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),

    ul: ({ children }) => (
      <ul className="space-y-3 my-5 pl-2">{children}</ul>
    ),

    ol: ({ children }) => (
      <ol className="space-y-3 my-5 pl-6 list-decimal marker:text-blue-600 marker:font-bold">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="flex gap-3 text-slate-600 leading-7">
        <span className="text-blue-600 mt-1.5">●</span>
        <span>{children}</span>
      </li>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 bg-blue-50 rounded-r-xl px-5 py-4 my-6 text-slate-700">
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-7 rounded-xl border border-slate-200">
        <table className="w-full text-sm text-left">{children}</table>
      </div>
    ),

    th: ({ children }) => (
      <th className="bg-slate-100 text-slate-800 font-bold p-4 border-b border-slate-200">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="p-4 border-b border-slate-100 text-slate-600">
        {children}
      </td>
    ),

    hr: () => <hr className="my-8 border-slate-200" />,

    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 font-semibold underline underline-offset-4"
      >
        {children}
      </a>
    ),
  };

  return (
    <section id="plan-trip" className="py-20 px-5 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-widest uppercase border border-blue-100">
            ✦ AI Powered Travel Planning
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-5">
            Plan Your Next
            <span className="text-blue-600"> Journey</span>
          </h2>

          <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Tell us where you want to go. Our AI will help you create a
            personalized travel itinerary based on your preferences.
          </p>
        </div>

        {/* Trip Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="bg-slate-950 px-7 md:px-10 py-8 text-white">
            <p className="text-blue-300 text-xs font-bold tracking-widest uppercase">
              Start Planning
            </p>

            <h3 className="text-2xl md:text-3xl font-bold mt-2">
              Where would you like to go?
            </h3>

            <p className="text-slate-300 text-sm mt-2">
              Customize your trip to match your travel style.
            </p>
          </div>

          <div className="p-6 md:p-10 space-y-8">

            {/* Destination - Navbar Destinations link target */}
            <div id="destinations" className="scroll-mt-24">
              <label className="block text-sm font-bold text-slate-800 mb-3">
                01. Destination
              </label>

              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Search a city, country or destination..."
                required
                className={inputClass}
              />

              <div className="flex items-center justify-between mt-6 mb-4">
                <p className="text-sm font-bold text-slate-700">
                  Popular destinations
                </p>

                <span className="text-xs text-slate-400">
                  Choose a destination
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {destinations.map((place) => (
                  <DestinationCard
                    key={place.id}
                    destination={place}
                    selected={destination}
                    onSelect={setDestination}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* Duration and Travelers */}
            <div className="grid md:grid-cols-2 gap-7">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">
                  02. Trip Duration
                </label>

                <input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="Number of days"
                  required
                  className={inputClass}
                />

                <p className="text-xs text-slate-400 mt-2">
                  Choose between 1 and 30 days.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">
                  03. Number of Travelers
                </label>

                <input
                  type="number"
                  min="1"
                  max="20"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  required
                  className={inputClass}
                />

                <p className="text-xs text-slate-400 mt-2">
                  Total number of people travelling.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* Budget and Travel Style */}
            <div className="grid md:grid-cols-2 gap-7">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">
                  04. Travel Budget
                </label>

                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  className={inputClass}
                >
                  <option value="">Select your budget</option>
                  <option value="Budget Friendly">Budget Friendly</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">
                  05. Travel Style
                </label>

                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  required
                  className={inputClass}
                >
                  <option value="">Choose travel style</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Relaxation">Relaxation</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Nature">Nature</option>
                  <option value="Family">Family</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Creating Your Itinerary...
                </>
              ) : (
                <>
                  Generate My Travel Plan
                  <span className="text-xl">→</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400">
              Powered by AI · Personalized travel recommendations
            </p>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-10 md:p-16 text-center shadow-sm">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>

            <h3 className="text-2xl font-bold text-slate-900">
              Preparing Your Journey
            </h3>

            <p className="text-slate-500 mt-3 max-w-md mx-auto">
              Our AI is organizing your destination, activities and daily
              travel recommendations.
            </p>

            <div className="flex justify-center gap-2 mt-7">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:300ms]"></span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">!</span>
              <p className="font-bold">Unable to generate your trip</p>
            </div>

            <p className="text-sm mt-2">{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="mt-4 text-sm font-bold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Generated Trip Result */}
        {itinerary && (
          <div id="generated-trip" className="mt-16 scroll-mt-8">

            {/* Destination Cover */}
            <div
              className="relative min-h-[300px] md:min-h-[390px] rounded-t-3xl overflow-hidden bg-slate-900 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(15,23,42,0.95), rgba(15,23,42,0.35)), url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1800')",
              }}
            >
              <div className="relative z-10 min-h-[300px] md:min-h-[390px] flex flex-col justify-end p-7 md:p-12">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white bg-white/15 border border-white/20 rounded-full px-4 py-2 w-fit backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Your AI Travel Plan
                </span>

                <p className="text-blue-200 text-sm font-semibold mt-7 uppercase tracking-widest">
                  Your next destination
                </p>

                <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-2 break-words">
                  {destination}
                </h2>

                <p className="text-slate-200 mt-4 max-w-xl leading-relaxed">
                  A personalized journey designed around your preferences.
                  Explore your day-wise travel recommendations below.
                </p>
              </div>
            </div>

            {/* Trip Information Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 bg-white border-x border-slate-200 p-4 md:p-6">

              {/* Destination */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-xl text-xl">
                  ⌖
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase mt-4">
                  Destination
                </p>
                <p className="font-bold text-slate-900 mt-1 break-words">
                  {destination}
                </p>
              </div>

              {/* Duration */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
                <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-xl text-xl">
                  ▦
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase mt-4">
                  Duration
                </p>
                <p className="font-bold text-slate-900 mt-1">
                  {days} Days
                </p>
              </div>

              {/* Travelers */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
                <div className="w-10 h-10 flex items-center justify-center bg-cyan-100 text-cyan-700 rounded-xl text-xl">
                  ♧
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase mt-4">
                  Travelers
                </p>
                <p className="font-bold text-slate-900 mt-1">
                  {travelers} People
                </p>
              </div>

              {/* Budget */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
                <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-xl text-xl">
                  ₹
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase mt-4">
                  Travel Budget
                </p>
                <p className="font-bold text-slate-900 mt-1 break-words">
                  {budget}
                </p>
              </div>

              {/* Travel Style */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
                <div className="w-10 h-10 flex items-center justify-center bg-violet-100 text-violet-700 rounded-xl text-xl">
                  ✧
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase mt-4">
                  Travel Style
                </p>
                <p className="font-bold text-slate-900 mt-1">
                  {travelStyle}
                </p>
              </div>
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
                      Explore the experiences planned for your trip.
                    </p>
                  </div>

                  <div className="text-[15px] md:text-base leading-8 break-words">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {itinerary}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Trip Overview Sidebar */}
                <aside className="space-y-5">
                  <div className="bg-slate-950 text-white rounded-2xl p-6">
                    <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">
                      Trip Overview
                    </p>

                    <h4 className="text-xl font-bold mt-3">
                      Your Journey
                    </h4>

                    <div className="mt-6 space-y-5">
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-slate-400">Destination</span>
                        <span className="font-semibold text-right break-words">
                          {destination}
                        </span>
                      </div>

                      <div className="h-px bg-white/10"></div>

                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-slate-400">Duration</span>
                        <span className="font-semibold">{days} days</span>
                      </div>

                      <div className="h-px bg-white/10"></div>

                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-slate-400">Travelers</span>
                        <span className="font-semibold">{travelers}</span>
                      </div>

                      <div className="h-px bg-white/10"></div>

                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-slate-400">Budget</span>
                        <span className="font-semibold text-right">
                          {budget}
                        </span>
                      </div>

                      <div className="h-px bg-white/10"></div>

                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-slate-400">Travel Style</span>
                        <span className="font-semibold">{travelStyle}</span>
                      </div>
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
                      AI Generated Plan
                    </p>
                    <p className="text-xs text-blue-700 leading-6 mt-2">
                      Recommendations are AI-generated suggestions.
                      Check current prices, opening hours and availability
                      before travelling.
                    </p>
                  </div>
                </aside>
              </div>

              {/* Bottom Action */}
              <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">

                <div>
                  <h4 className="font-bold text-slate-900">
                    Ready for another adventure?
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Save your current itinerary or create a new travel plan.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

                  {/* Save Trip Button */}
                  <button
                    type="button"
                    onClick={handleSaveTrip}
                    disabled={saving}
                    className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition disabled:opacity-60"
                  >
                    {saving ? "Saving Trip..." : "♡ Save This Trip"}
                  </button>

                  {/* Plan Another Trip Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setItinerary("");
                      setError("");
                      setSaveMessage("");

                      document.getElementById("plan-trip")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="w-full sm:w-auto px-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition shadow-lg shadow-blue-100"
                  >
                    Plan Another Trip →
                  </button>
                </div>

                {/* Save Status */}
                {saveMessage && (
                  <p className="text-sm text-center text-slate-600">
                    {saveMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TripPlanner;
