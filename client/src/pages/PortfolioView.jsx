// src/pages/PortfolioView.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PortfolioView() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/portfolio/${id}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Portfolio not found');
        if (!data.success) throw new Error(data.message || 'Failed to load portfolio');

        setPortfolio(data.data);
      } catch (err) {
        setError(err.message || 'Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4B96FF]"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white/90 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Portfolio</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <a 
            href="/generate" 
            className="inline-block bg-[#4B96FF] hover:bg-[#3a7bcc] text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Create New Portfolio
          </a>
        </div>
      </div>
    );
  }

  const { 
    personalInfo = {},
    skills = [],
    projects = [],
    contactInfo = {},
    generatedContent = {}
  } = portfolio;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {personalInfo.fullName || 'My Portfolio'}
          </h1>
          <p className="text-xl text-[#4B96FF]">
            {generatedContent.tagline || personalInfo.professionalTitle || 'Professional Portfolio'}
          </p>
        </header>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {generatedContent.bio || personalInfo.bio || 'No bio available'}
          </p>
        </section>

        {/* Skills Section */}
        {skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-[#4B96FF]/10 text-[#4B96FF] px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {project.title || 'Untitled Project'}
                  </h3>
                  <p className="text-gray-600 mb-3 whitespace-pre-line">
                    {project.generatedDescription || project.description || 'No description available'}
                  </p>
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block text-[#4B96FF] hover:text-[#3a7bcc] text-sm"
                    >
                      View Live Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="pt-6 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h2>
          <div className="flex flex-wrap gap-4">
            {contactInfo.email && (
              <a 
                href={`mailto:${contactInfo.email}`} 
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                {contactInfo.email}
              </a>
            )}
            {contactInfo.socialLinks?.linkedin && (
              <a 
                href={contactInfo.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            )}
            {contactInfo.socialLinks?.github && (
              <a 
                href={contactInfo.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}