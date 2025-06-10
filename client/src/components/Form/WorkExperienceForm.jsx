import { useState } from 'react';

export default function WorkExperienceForm({ data = {}, updateData = () => {}, nextStep = () => {}, prevStep = () => {} }) {
  const [experiences, setExperiences] = useState(data?.workExperience || [{
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  }]);

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    
    // If "current" is checked, clear end date
    if (field === 'current' && value) {
      updated[index].endDate = '';
    }
    
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }]);
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ workExperience: experiences });
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
                Work Experience
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-gray-900/30 backdrop-blur-sm border-2 border-gray-700 rounded-2xl p-6 relative group hover:border-purple-400/50 transition-all duration-300">
                  {/* Experience card glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative space-y-6">
                    {/* Job Title and Company Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group/input">
                        <label className="block text-sm font-semibold text-cyan-300 mb-3 tracking-wide uppercase">
                          Job Title*
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 hover:border-gray-600"
                            required
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                      
                      <div className="group/input">
                        <label className="block text-sm font-semibold text-purple-300 mb-3 tracking-wide uppercase">
                          Company*
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:border-gray-600"
                            required
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Date and Current Job Row */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="group/input">
                        <label className="block text-sm font-semibold text-emerald-300 mb-3 tracking-wide uppercase">
                          Start Date*
                        </label>
                        <div className="relative">
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/25 transition-all duration-300 hover:border-gray-600"
                            required
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                      
                      <div className="group/input">
                        <label className="block text-sm font-semibold text-pink-300 mb-3 tracking-wide uppercase">
                          End Date
                        </label>
                        <div className="relative">
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/25 transition-all duration-300 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={exp.current}
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-end">
                        <label className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-800/30 border-2 border-gray-600 hover:border-cyan-400 transition-all duration-300 cursor-pointer group/checkbox">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                            className="h-5 w-5 rounded bg-gray-700 border-2 border-gray-600 text-cyan-400 focus:ring-cyan-400 focus:ring-2"
                          />
                          <span className="text-sm text-white/80 font-medium group-hover/checkbox:text-cyan-300 transition-colors duration-300">Currently working here</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="group/input">
                      <label className="block text-sm font-semibold text-yellow-300 mb-3 tracking-wide uppercase">
                        Description*
                      </label>
                      <div className="relative">
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                          rows={4}
                          className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:shadow-lg focus:shadow-yellow-400/25 transition-all duration-300 hover:border-gray-600 resize-none"
                          placeholder="Describe your responsibilities, achievements, and key contributions..."
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    
                    {/* Remove Experience Button */}
                    {experiences.length > 1 && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-all duration-300 font-medium"
                        >
                          Remove Experience
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Add Experience Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={addExperience}
                  className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border-2 border-emerald-500/30 text-emerald-300 font-semibold rounded-2xl hover:from-emerald-600/30 hover:to-cyan-600/30 hover:border-emerald-400 transition-all duration-300 hover:scale-105 transform"
                >
                  <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
                  <span>Add Another Experience</span>
                </button>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="group px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-2xl border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-105 transform"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <span>Back</span>
                  </span>
                </button>
                
                <button
                  type="submit"
                  onClick={handleSubmit}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}