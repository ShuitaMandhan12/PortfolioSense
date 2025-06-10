// src/components/forms/HobbiesLanguagesForm.jsx
import { useState } from 'react';

export default function HobbiesLanguagesForm({ data, updateData, nextStep, prevStep }) {
  const [formState, setFormState] = useState({
    hobbies: data.hobbies || [],
    languages: data.languages || [{ language: '', proficiency: '' }]
  });

  const [newHobby, setNewHobby] = useState('');

  // Hobbies handlers
  const handleAddHobby = () => {
    if (newHobby.trim() && !formState.hobbies.includes(newHobby.trim())) {
      setFormState(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby.trim()]
      }));
      setNewHobby('');
    }
  };

  const handleRemoveHobby = (hobbyToRemove) => {
    setFormState(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(hobby => hobby !== hobbyToRemove)
    }));
  };

  // Languages handlers
  const handleLanguageChange = (index, field, value) => {
    const updated = [...formState.languages];
    updated[index] = { ...updated[index], [field]: value };
    setFormState(prev => ({ ...prev, languages: updated }));
  };

  const addLanguage = () => {
    setFormState(prev => ({
      ...prev,
      languages: [...prev.languages, { language: '', proficiency: '' }]
    }));
  };

  const removeLanguage = (index) => {
    if (formState.languages.length > 1) {
      setFormState(prev => ({
        ...prev,
        languages: prev.languages.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(formState);
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
                Hobbies & Languages
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Hobbies Section */}
              <div className="group">
                <h3 className="text-2xl font-bold text-emerald-300 mb-6 tracking-wide uppercase">Your Hobbies & Interests</h3>
                
                {/* Display existing hobbies */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {formState.hobbies.map((hobby, index) => (
                    <div key={index} className="relative group/hobby">
                      <div className="flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full px-6 py-3 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
                        <span className="text-white font-medium">{hobby}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveHobby(hobby)}
                          className="ml-3 w-6 h-6 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/40 hover:text-white transition-all duration-300 flex items-center justify-center text-sm font-bold"
                        >
                          ×
                        </button>
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover/hobby:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    </div>
                  ))}
                </div>

                {/* Add new hobby */}
                <div className="flex gap-4">
                  <div className="flex-1 group/input relative">
                    <input
                      type="text"
                      value={newHobby}
                      onChange={(e) => setNewHobby(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/25 transition-all duration-300 hover:border-gray-600"
                      placeholder="Add a hobby or interest"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddHobby}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transform"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {/* Languages Section */}
              <div className="group">
                <h3 className="text-2xl font-bold text-purple-300 mb-6 tracking-wide uppercase">Languages You Know</h3>
                <div className="space-y-6">
                  {formState.languages.map((lang, index) => (
                    <div key={index} className="group/lang relative">
                      <div className="bg-gray-900/30 border-2 border-gray-700 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/5 to-pink-400/5 opacity-0 group-hover/lang:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative grid md:grid-cols-2 gap-6 mb-4">
                          <div className="group/langfield">
                            <label className="block text-sm font-semibold text-cyan-300 mb-3 tracking-wide uppercase">
                              Language*
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={lang.language}
                                onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 hover:border-gray-600"
                                required
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover/langfield:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                          
                          <div className="group/proffield">
                            <label className="block text-sm font-semibold text-pink-300 mb-3 tracking-wide uppercase">
                              Proficiency*
                            </label>
                            <div className="relative">
                              <select
                                value={lang.proficiency}
                                onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/25 transition-all duration-300 hover:border-gray-600 appearance-none cursor-pointer"
                                required
                              >
                                <option value="" className="bg-gray-900">Select proficiency</option>
                                <option value="Beginner" className="bg-gray-900">Beginner</option>
                                <option value="Intermediate" className="bg-gray-900">Intermediate</option>
                                <option value="Advanced" className="bg-gray-900">Advanced</option>
                                <option value="Fluent" className="bg-gray-900">Fluent</option>
                                <option value="Native" className="bg-gray-900">Native</option>
                              </select>
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover/proffield:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                              {/* Custom dropdown arrow */}
                              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {formState.languages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLanguage(index)}
                            className="relative text-sm text-red-300 hover:text-red-200 font-medium px-4 py-2 rounded-lg border border-red-400/30 hover:bg-red-500/10 transition-all duration-300"
                          >
                            Remove Language
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="group/add flex items-center text-purple-300 hover:text-purple-200 font-semibold px-6 py-3 rounded-2xl border-2 border-dashed border-purple-400/30 hover:border-purple-400/60 bg-purple-500/5 hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <span className="mr-3 text-xl">+</span> 
                    <span>Add Another Language</span>
                  </button>
                </div>
              </div>
              
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