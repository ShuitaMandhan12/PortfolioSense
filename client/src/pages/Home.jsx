// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00178F]/10 via-[#4B96FF]/10 to-[#FFA2B6]/10 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4B96FF] to-[#FFA2B6] bg-clip-text text-transparent mb-6">
          Create Your Professional Portfolio in Minutes
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          PortfolioSense uses AI to generate a beautiful, personalized portfolio website tailored just for you.
        </p>
        <Link
          to="/generate"
          className="inline-block bg-gradient-to-r from-[#4B96FF] to-[#FFA2B6] hover:opacity-90 text-white font-bold py-3 px-8 rounded-lg text-lg transition-opacity"
        >
          Start Building
        </Link>
      </div>
    </div>
  );
}