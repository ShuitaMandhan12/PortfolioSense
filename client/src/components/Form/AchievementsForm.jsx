// src/components/forms/AchievementsForm.jsx
import { useState } from 'react';

export default function AchievementsForm({ data, updateData, nextStep, prevStep }) {
  const [achievements, setAchievements] = useState(data.achievements || [{
    title: '',
    organization: '',
    year: '',
    description: ''
  }]);

  const handleChange = (index, field, value) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], [field]: value };
    setAchievements(updated);
  };

  const addAchievement = () => {
    setAchievements([...achievements, {
      title: '',
      organization: '',
      year: '',
      description: ''
    }]);
  };

  const removeAchievement = (index) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ achievements });
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
                Achievements & Awards
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {achievements.map((ach, index) => (
                <div key={index} className="group/achievement relative">
                  <div className="bg-gray-900/30 border-2 border-gray-700 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/5 to-pink-400/5 opacity-0 group-hover/achievement:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Achievement header with trophy icon */}
                    <div className="relative flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-emerald-300 uppercase tracking-wide">
                        Achievement {index + 1}
                      </h3>
                    </div>

                    <div className="relative space-y-6">
                      {/* Title and Organization Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="group/field">
                          <label className="block text-sm font-semibold text-cyan-300 mb-3 tracking-wide uppercase">
                            Title*
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={ach.title}
                              onChange={(e) => handleChange(index, 'title', e.target.value)}
                              className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 hover:border-gray-600"
                              required
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                        </div>
                        
                        <div className="group/field">
                          <label className="block text-sm font-semibold text-purple-300 mb-3 tracking-wide uppercase">
                            Awarding Organization*
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={ach.organization}
                              onChange={(e) => handleChange(index, 'organization', e.target.value)}
                              className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:border-gray-600"
                              required
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Year Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="group/field">
                          <label className="block text-sm font-semibold text-pink-300 mb-3 tracking-wide uppercase">
                            Year Received*
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="1900"
                              max="2099"
                              value={ach.year}
                              onChange={(e) => handleChange(index, 'year', e.target.value)}
                              className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/25 transition-all duration-300 hover:border-gray-600"
                              required
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <div className="group/field">
                        <label className="block text-sm font-semibold text-emerald-300 mb-3 tracking-wide uppercase">
                          Description
                        </label>
                        <div className="relative">
                          <textarea
                            value={ach.description}
                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                            rows={4}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/25 transition-all duration-300 hover:border-gray-600 resize-none"
                            placeholder="Describe your achievement and its significance..."
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 opacity-0 group-hover/field:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      {achievements.length > 1 && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeAchievement(index)}
                            className="text-sm text-red-300 hover:text-red-200 font-medium px-4 py-2 rounded-lg border border-red-400/30 hover:bg-red-500/10 transition-all duration-300"
                          >
                            Remove Achievement
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add Another Achievement Button */}
              <button
                type="button"
                onClick={addAchievement}
                className="group/add w-full flex items-center justify-center text-purple-300 hover:text-purple-200 font-semibold px-6 py-4 rounded-2xl border-2 border-dashed border-purple-400/30 hover:border-purple-400/60 bg-purple-500/5 hover:bg-purple-500/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">+</span>
                  </div>
                  <span className="text-lg">Add Another Achievement</span>
                </div>
              </button>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="group relative px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-2xl shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105 transform overflow-hidden"
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