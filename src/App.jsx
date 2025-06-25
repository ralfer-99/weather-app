import React, { useEffect, useState } from "react";
import { fetchWeather, searchLocations } from "./api/weather";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [city, setCity] = useState("Colombo");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWeather(city);
  }, [city]);

  const loadWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const weatherData = await fetchWeather(cityName);
      setData(weatherData);
    } catch {
      setData(null);
      setError("City not found or API error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchLocations(input);
        setSuggestions(results);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [input]);

  const handleSearch = () => {
    if (input.trim()) {
      setCity(input.trim());
      setInput("");
      setSuggestions([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-300 flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-white/10 backdrop-blur-[10px] border border-white/20 rounded-[30px] shadow-2xl w-full max-w-2xl px-6 py-8 sm:px-8 md:px-10 text-white transition-all duration-300">
        
        {/* ✅ Search Bar */}
        <div className="relative mb-6 flex flex-row gap-2 flex-wrap">
          <input
            type="text"
            className="flex-1 rounded-full px-5 py-3 bg-white/20 text-white placeholder-white/70 outline-none backdrop-blur-md text-sm min-w-[200px]"
            placeholder="Search city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            className="px-5 py-3 min-w-[100px] rounded-full bg-purple-700 hover:bg-purple-800 text-white font-semibold"
            onClick={handleSearch}
          >
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 z-10 max-h-48 overflow-y-auto bg-white/20 backdrop-blur-md rounded-lg mt-1 text-black text-sm">
              {suggestions.map((place) => (
                <li
                  key={`${place.lat}-${place.lon}-${place.name}`}
                  onClick={() => {
                    setCity(place.name);
                    setInput("");
                    setSuggestions([]);
                  }}
                  className="cursor-pointer px-4 py-2 hover:bg-purple-600 hover:text-white rounded-lg"
                >
                  {place.name}, {place.region}, {place.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Weather Result */}
        {loading ? (
          <div className="text-center font-semibold">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400 font-semibold">{error}</div>
        ) : (
          data && <WeatherCard data={data} />
        )}
      </div>
    </div>
  );
}
