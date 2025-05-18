import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInfo from '../components/Form/BasicInfo';
import Projects from '../components/Form/Projects';
import SocialLinks from '../components/Form/SocialLinks';
import Preview from '../components/Preview';

export default function Generator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    skills: [],
    projects: [],
    socialLinks: {}
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [portfolioId, setPortfolioId] = useState(null);
  const navigate = useNavigate();

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

 const handleSubmit = async () => {
  setIsGenerating(true);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        skills: Array.isArray(formData.skills) ? formData.skills : formData.skills.split(',').map(s => s.trim())
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate portfolio');
    }

    if (!data.success) {
      throw new Error(data.message || 'Portfolio generation failed');
    }

    setPortfolioId(data.data.uniqueId);
    setStep(4);
  } catch (error) {
    console.error('Generation error:', error);
    alert(`Failed to generate portfolio: ${error.message}\n\nPlease check your input and try again.`);
  } finally {
    setIsGenerating(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Build Your Portfolio</h1>
          
          {step === 1 && (
            <BasicInfo 
              data={formData} 
              updateData={updateFormData} 
              nextStep={() => setStep(2)} 
            />
          )}
          
          {step === 2 && (
            <Projects 
              data={formData} 
              updateData={updateFormData} 
              prevStep={() => setStep(1)} 
              nextStep={() => setStep(3)} 
            />
          )}
          
          {step === 3 && (
            <SocialLinks 
              data={formData} 
              updateData={updateFormData} 
              prevStep={() => setStep(2)} 
              onSubmit={handleSubmit} 
              isLoading={isGenerating}
            />
          )}
          
          {step === 4 && portfolioId && (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Portfolio Created!</h2>
              <p className="text-gray-600 mb-6">Here's your unique portfolio link:</p>
              
              <div className="flex items-center justify-center mb-6">
                <input 
                  type="text" 
                  value={`${window.location.origin}/portfolio/${portfolioId}`}
                  readOnly
                  className="border border-gray-300 rounded-l-lg px-4 py-2 w-96"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/portfolio/${portfolioId}`);
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700"
                >
                  Copy
                </button>
              </div>
              
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => navigate(`/portfolio/${portfolioId}`)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  View Live Portfolio
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Create Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}