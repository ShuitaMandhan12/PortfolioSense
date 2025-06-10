// src/components/forms/CustomSectionsForm.jsx
import { useState } from 'react';

export default function CustomSectionsForm({ data, updateData, nextStep, prevStep }) {
  const [customSections, setCustomSections] = useState(data.customSections || [{
    title: '',
    content: ''
  }]);

  const handleChange = (index, field, value) => {
    const updated = [...customSections];
    updated[index] = { ...updated[index], [field]: value };
    setCustomSections(updated);
  };

  const addSection = () => {
    setCustomSections([...customSections, {
      title: '',
      content: ''
    }]);
  };

  const removeSection = (index) => {
    if (customSections.length > 1) {
      setCustomSections(customSections.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ customSections });
    nextStep();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Main container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/20 overflow-hidden relative group">
          {/* Neon border animation */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
          <div className="absolute inset-[1px] rounded-3xl bg-black/80 backdrop-blur-xl"></div>
          
          <div className="relative p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Custom Sections
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-4 text-lg">Add unique sections to showcase your personality and achievements</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Custom Sections */}
              <div className="space-y-6">
                {customSections.map((section, index) => (
                  <div key={index} className="group relative">
                    <div className="bg-gray-900/30 border border-purple-400/30 rounded-2xl p-6 hover:bg-gray-900/40 hover:border-purple-400/50 transition-all duration-300">
                      {/* Section Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="h-3 w-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                          <h3 className="text-white font-bold text-lg">
                            Section {index + 1}
                          </h3>
                        </div>
                        {customSections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSection(index)}
                            className="group/remove flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-300 rounded-xl hover:bg-red-500/30 hover:border-red-400/50 hover:text-red-200 transition-all duration-300"
                          >
                            <svg className="w-4 h-4 group-hover/remove:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="text-sm font-medium">Remove</span>
                          </button>
                        )}
                      </div>

                      {/* Section Title Input */}
                      <div className="mb-6 group/field">
                        <label className="block text-sm font-semibold text-cyan-300 mb-3 tracking-wide uppercase">
                          Section Title*
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => handleChange(index, 'title', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 hover:border-gray-600"
                            placeholder="e.g., Publications, Volunteer Work, Awards, Hobbies"
                            required
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                      
                      {/* Section Content Input */}
                      <div className="group/field">
                        <label className="block text-sm font-semibold text-purple-300 mb-3 tracking-wide uppercase">
                          Content*
                        </label>
                        <div className="relative">
                          <textarea
                            value={section.content}
                            onChange={(e) => handleChange(index, 'content', e.target.value)}
                            rows={6}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:border-gray-600 resize-none"
                            placeholder="Enter your content here. You can use markdown formatting for better presentation..."
                            required
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        <p className="text-gray-400 text-sm mt-2 flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Supports markdown formatting for **bold**, *italic*, and [links](url)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add Section Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={addSection}
                  className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 transform"
                >
                  <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Another Section</span>
                </button>
              </div>

              {/* Info Panel */}
              <div className="bg-gray-900/20 border border-emerald-400/30 rounded-2xl p-6 group hover:bg-gray-900/30 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-emerald-200 transition-colors duration-300">
                      Pro Tips for Custom Sections
                    </h3>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>Use sections like "Publications", "Volunteer Work", "Awards", or "Personal Projects"</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>Format text with **bold** and *italic* markdown for better readability</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>Add links using [text](url) format to showcase your work</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="group relative px-8 py-4 bg-gray-800/50 border-2 border-gray-600 text-white font-bold rounded-2xl hover:border-gray-500 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 transform overflow-hidden"
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
                  className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 transform overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Next Step</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
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