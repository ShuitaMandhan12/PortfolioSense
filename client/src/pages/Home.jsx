export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-indigo-800 mb-6">
          Create Your Dev Portfolio in Seconds
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          PortfolioSense uses AI to generate a beautiful, professional portfolio website tailored just for you.
        </p>
        <a 
          href="/generate" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          Start Building
        </a>
      </div>
    </div>
  );
}