"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./slices/weatherSlice";
import { fetchCrypto, startCryptoWebSocket } from "./slices/cryptoSlice";
import { useEffect } from "react";
import { fetchNews } from "./slices/newsSlice";
import { RootState, AppDispatch } from "./store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  // Ensure proper typing
  const weather = useSelector(
    (state: RootState) =>
      state.weather.data as Record<string, { main?: { temp: number } }>
  );
  const crypto = useSelector(
    (state: RootState) =>
      state.crypto.data as Record<
        string,
        { usd: number; usd_24h_change?: number }
      >
  );
  const news = useSelector((state: RootState) => state.news.articles);

  useEffect(() => {
    dispatch(fetchWeather("New York"));
    dispatch(fetchWeather("London"));
    dispatch(fetchWeather("Tokyo"));
    dispatch(fetchCrypto());
    dispatch(fetchNews());
    startCryptoWebSocket(dispatch);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🌍 CryptoWeather Nexus
        </h1>

        {/* Weather Data */}
        <h2 className="text-xl font-semibold text-gray-700 mt-6">
          🌦 Weather Data
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {Object.keys(weather).map((city) => (
            <div
              key={city}
              className="p-4 bg-blue-100 rounded-lg shadow-md text-center"
            >
              <p className="font-bold text-black">{city}</p>
              <p className="text-gray-700">{weather[city]?.main?.temp}°C</p>
            </div>
          ))}
        </div>

        {/* Cryptocurrency Prices */}
        <h2 className="text-xl font-semibold text-gray-700 mt-8">
          💰 Cryptocurrency Prices
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {Object.keys(crypto).map((coin) => (
            <div
              key={coin}
              className="p-4 bg-green-100 rounded-lg shadow-md text-center"
            >
              <p className="font-bold text-gray-700">{coin.toUpperCase()}</p>
              <p className="text-gray-700">💲 {crypto[coin]?.usd}</p>
              <p
                className={`text-sm font-medium ${
                  crypto[coin]?.usd_24h_change! >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {crypto[coin]?.usd_24h_change?.toFixed(2)}% (24h)
              </p>
            </div>
          ))}
        </div>

        {/* Crypto News */}
        <h2 className="text-xl font-semibold text-gray-700 mt-8">
          📰 Crypto News
        </h2>
        <ul className="mt-4 space-y-3">
          {news.map((article, index) => (
            <li key={index} className="border-b border-gray-300 pb-2">
              {typeof article.title === "string" ? ( // Ensure it's a string
                <a
                  href={article.link} // Use the correct field name
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium transition duration-300"
                >
                  {article.title}
                </a>
              ) : (
                <p className="text-red-600">Invalid title</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
