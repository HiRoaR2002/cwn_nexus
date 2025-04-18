# CryptoWeather Nexus

## 🌍 Overview

CryptoWeather Nexus is a web application that provides real-time updates on cryptocurrency prices, weather information, and crypto-related news. Built using **Next.js**, **Redux Toolkit**, and **WebSockets**, it fetches data from multiple APIs to deliver the latest insights in one place.

## 🛠 Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **State Management:** Redux Toolkit
- **Data Fetching:** Axios, WebSockets
- **APIs Used:**
  - [CoinGecko API](https://www.coingecko.com/en/api) (Crypto prices)
  - [OpenWeather API](https://openweathermap.org/api) (Weather data)
  - [NewsData.io](https://newsdata.io/) (Crypto news)

## 📌 Features

✅ **Live Crypto Prices** – Fetches real-time cryptocurrency prices using CoinGecko API and WebSockets.
✅ **Weather Forecasts** – Retrieves weather data for major cities worldwide.
✅ **Crypto News** – Displays latest news articles about cryptocurrency.
✅ **Redux State Management** – Uses Redux Toolkit for efficient state handling.

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/cryptoweather-nexus.git
cd cryptoweather-nexus
```

### 2️⃣ Install Dependencies

```sh
npm install
# or
yarn install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following keys:

```sh
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_api_key
```

### 4️⃣ Run the Development Server

```sh
npm run dev
# or
yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Project Structure

```
📂 src/
 ┣ 📂 slices/          # Redux slices (crypto, weather, news)
 ┣ 📂 components/      # Reusable UI components
 ┣ 📂 pages/           # Next.js pages
 ┣ 📂 store/           # Redux store setup
 ┗ 📜 README.md        # Project documentation
```

## 📸 Screenshots

Coming soon... 🚀

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo, open an issue, or submit a pull request.

## 📜 License

This project is licensed under the MIT License.

---
