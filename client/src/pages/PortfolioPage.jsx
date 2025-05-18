import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PortfolioPage() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setPortfolio(data.data);
        } else {
          setError(data.error || 'Portfolio not found');
        }
      } catch (err) {
        setError('Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error || 'Portfolio data not available'}</p>
        </div>
      </div>
    );
  }

  // Safely destructure with defaults
  const {
    name = '',
    skills = [],
    projects = [],
    socialLinks = {},
    generatedContent = {}
  } = portfolio;

  const {
    bio = 'No bio available',
    tagline = 'Professional Portfolio'
  } = generatedContent;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{name}</h1>
          <p className="text-xl text-indigo-600">{tagline}</p>
        </header>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed">
            {bio}
          </p>
        </section>

        {/* Skills Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Projects</h2>
          <div className="space-y-8">
            {projects.map((project, index) => {
              const description = project.generatedDescription || project.description || 'No description available';
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {project.title || 'Untitled Project'}
                  </h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h2>
          <div className="flex space-x-4">
            {socialLinks.github && (
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                GitHub
              </a>
            )}
            {socialLinks.linkedin && (
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                LinkedIn
              </a>
            )}
            {socialLinks.twitter && (
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                Twitter
              </a>
            )}
            {!socialLinks.github && !socialLinks.linkedin && !socialLinks.twitter && (
              <p className="text-gray-500">No contact links provided</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}