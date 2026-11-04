
function DestinationCard({ destination, onSelect, selected }) {
  const isSelected = selected === destination.name;

  return (
    <div
      onClick={() => onSelect(destination.name)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-white transition-all duration-300
        ${
          isSelected
            ? "ring-2 ring-blue-600 shadow-xl shadow-blue-100 -translate-y-1"
            : "border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1"
        }`}
    >
      {/* Destination Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            ✓ Selected
          </div>
        )}

        {/* Destination Name */}
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white text-xl font-bold drop-shadow-md">
            {destination.name}
          </h3>
          <p className="text-white/80 text-sm mt-1">
            📍 {destination.country}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-semibold text-gray-700">
          Explore destination
        </span>

        <span
          className={`w-8 h-8 flex items-center justify-center rounded-full transition
            ${
              isSelected
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
            }`}
        >
          →
        </span>
      </div>
    </div>
  );
}

export default DestinationCard;
