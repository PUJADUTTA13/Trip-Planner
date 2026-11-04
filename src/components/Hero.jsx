
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 text-white">
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-7">
            <span>✦</span>
            <span className="text-sm font-semibold tracking-wide text-blue-100">
              YOUR PERSONAL AI TRAVEL COMPANION
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Discover More.
            <span className="block text-cyan-300">
              Travel Better.
            </span>
          </h1>

          <p className="text-blue-100/80 mt-7 text-lg md:text-xl leading-relaxed max-w-xl">
            Your next adventure starts here. Let AI create personalized
            travel itineraries based on your destination, budget and
            travel style.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-9">
            <a
              href="#plan-trip"
              className="inline-flex items-center gap-3 bg-white text-blue-900 px-8 py-4 rounded-full font-bold shadow-xl hover:bg-cyan-100 hover:-translate-y-1 transition duration-300"
            >
              Plan My Trip
              <span className="text-xl">→</span>
            </a>

            <span className="text-sm text-blue-100/70">
              ✈ Your journey, your way
            </span>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/15">
            <div>
              <p className="text-2xl font-bold">AI</p>
              <p className="text-sm text-blue-200">Smart Planning</p>
            </div>
            <div>
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm text-blue-200">Personalized</p>
            </div>
            <div>
              <p className="text-2xl font-bold">Any</p>
              <p className="text-sm text-blue-200">Travel Budget</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="absolute -inset-3 bg-cyan-300/20 rounded-[2rem] blur-xl"></div>

          <div className="relative rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000"
              alt="Beautiful mountain travel destination"
              className="w-full h-[350px] md:h-[480px] object-cover hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sm text-cyan-200 font-semibold tracking-wider">
                FIND YOUR NEXT ADVENTURE
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                The world is waiting.
              </h2>
            </div>
          </div>

          {/* Floating Label */}
          <div className="absolute -bottom-5 -left-5 md:-left-8 bg-white text-gray-900 rounded-2xl shadow-xl px-5 py-4">
            <p className="text-xs text-gray-500 font-medium">
              YOUR NEXT TRIP
            </p>
            <p className="font-bold text-lg">Starts with AI ✨</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
