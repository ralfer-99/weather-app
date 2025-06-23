import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (city) => {
  if (!API_KEY) throw new Error("API key not found");

  const response = await axios.get("https://api.weatherapi.com/v1/current.json", {
    params: { key: API_KEY, q: city },
  });

  return response.data;
};

export const searchLocations = async (query) => {
  if (!API_KEY) throw new Error("API key not found");

  const response = await axios.get("https://api.weatherapi.com/v1/search.json", {
    params: { key: API_KEY, q: query },
  });

  return response.data;
};
