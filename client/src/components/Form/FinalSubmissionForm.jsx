// src/components/forms/FinalSubmissionForm.jsx
import { useState } from 'react';

export default function FinalSubmissionForm({ data, onGenerate, prevStep, isLoading }) {
  const [saveDraft, setSaveDraft] = useState(false);
  const [generatePublicLink, setGeneratePublicLink] = useState(true);
  const [downloadOptions, setDownloadOptions] = useState({
    html: true,
    pdf: false,
    json: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      saveDraft,
      generatePublicLink,
      downloadOptions
    });
  };

  const handleDownloadOptionChange = (option) => {
    setDownloadOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Main container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/20 overflow-hidden relative group">
          {/* Neon border animation */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
          <div className="absolute inset-[1px] rounded-3xl bg-black/80 backdrop-blur-xl"></div>
          
          <div className="relative p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Review & Generate
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Portfolio Summary */}
              <div className="group">
                <div className="bg-gray-900/30 border-2 border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-cyan-300 mb-6 tracking-wide uppercase">Portfolio Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-gray-700/50">
                        <span className="text-gray-300 font-medium">Name:</span>
                        <span className="text-white font-semibold">{data.personalInfo?.fullName || 'Not provided'}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-gray-700/50">
                        <span className="text-gray-300 font-medium">Professional Title:</span>
                        <span className="text-white font-semibold">{data.personalInfo?.professionalTitle || 'Not provided'}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-gray-700/50">
                        <span className="text-gray-300 font-medium">Skills:</span>
                        <span className="text-white font-semibold text-right">
                          {data.skills?.length > 0 
                            ? data.skills.slice(0, 3).join(', ') + (data.skills.length > 3 ? ` +${data.skills.length - 3} more` : '')
                            : 'Not provided'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-gray-700/50">
                        <span className="text-gray-300 font-medium">Projects:</span>
                        <span className="text-white font-semibold">{data.projects?.length || 0} added</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-gray-700/50">
                        <span className="text-gray-300 font-medium">Work Experience:</span>
                        <span className="text-white font-semibold">{data.workExperience?.length || 0} entries</span>
                      </div>

                      <div className="flex justify-between items-center p-3 rounded-xl bg-black/30 border border-gray-700/50">
                        <span className="text-gray-300 font-medium">Education:</span>
                        <span className="text-white font-semibold">{data.education?.length || 0} entries</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Options Section */}
              <div className="space-y-6">
                <div className="group">
                  <label className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-900/30 border-2 border-gray-700 hover:border-purple-400 transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={saveDraft}
                        onChange={(e) => setSaveDraft(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${saveDraft ? 'bg-purple-500 border-purple-400' : 'bg-gray-800 border-gray-600'}`}>
                        {saveDraft && (
                          <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-white font-semibold">Save as draft</span>
                      <p className="text-gray-400 text-sm mt-1">You can come back and edit later</p>
                    </div>
                  </label>
                </div>
                
                <div className="group">
                  <label className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-900/30 border-2 border-gray-700 hover:border-emerald-400 transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={generatePublicLink}
                        onChange={(e) => setGeneratePublicLink(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${generatePublicLink ? 'bg-emerald-500 border-emerald-400' : 'bg-gray-800 border-gray-600'}`}>
                        {generatePublicLink && (
                          <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-white font-semibold">Generate public link</span>
                      <p className="text-gray-400 text-sm mt-1">Share your portfolio with others</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Download Options */}
              <div className="group">
                <div className="bg-gray-900/30 border-2 border-gray-700 rounded-2xl p-6 hover:border-pink-400 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <h3 className="text-pink-300 font-bold mb-4 tracking-wide uppercase">Download Options</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(downloadOptions).map(([option, checked]) => (
                        <label key={option} className="flex items-center space-x-3 p-3 rounded-xl bg-black/30 border border-gray-700/50 hover:border-pink-400 transition-all duration-300 cursor-pointer group/item">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleDownloadOptionChange(option)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded-md border-2 transition-all duration-300 ${checked ? 'bg-pink-500 border-pink-400' : 'bg-gray-800 border-gray-600 group-hover/item:border-pink-400'}`}>
                              {checked && (
                                <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-white font-medium text-sm uppercase tracking-wide">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Ready Section */}
              <div className="group">
                <div className="bg-gradient-to-r from-gray-900/40 to-gray-800/40 border-2 border-gray-700 rounded-2xl p-6 hover:border-emerald-400 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <h3 className="text-emerald-300 font-bold mb-2 tracking-wide uppercase">Ready to create your portfolio?</h3>
                    <p className="text-gray-300">
                      Once generated, you'll be able to view your portfolio, download it in selected formats, or share the link with others.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between pt-6 space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="group relative px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-bold rounded-2xl border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-105 transform overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <span>Back</span>
                  </span>
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 transform overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Portfolio</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}