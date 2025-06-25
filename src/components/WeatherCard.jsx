import React from "react";

const WeatherCard = ({ data }) => {
  const {
    location,
    current: {
      temp_c,
      feelslike_c,
      humidity,
      wind_kph,
      uv,
      pressure_mb,
      wind_dir,
      condition,
    },
  } = data;

  return (
    <div className="text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{location.name}</h2>
      <p className="text-sm sm:text-md text-white/70 mt-1">{location.localtime}</p>

      <div className="flex flex-col items-center mt-4 mb-6">
        <img src={condition.icon} alt={condition.text} className="w-16 h-16 sm:w-20 sm:h-20" />
        <p className="text-white/80 text-sm mt-2">{condition.text}</p>
        <h1 className="text-3xl sm:text-[34px] md:text-[38px] font-extrabold mt-1">{temp_c}°C</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-medium mt-4">
        <div className="bg-white/20 p-3 rounded-xl">
          FEELS LIKE<br /><span className="text-lg">{feelslike_c}°C</span>
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          HUMIDITY<br /><span className="text-lg">{humidity}%</span>
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          WIND<br /><span className="text-lg">{wind_kph} km/h</span>
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          UV INDEX<br /><span className="text-lg">{uv}</span>
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          PRESSURE<br /><span className="text-lg">{pressure_mb} mb</span>
        </div>
        <div className="bg-white/20 p-3 rounded-xl">
          WIND DIR<br /><span className="text-lg">{wind_dir}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
