// src/components/forms/StylePreferencesForm.jsx
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function StylePreferencesForm({ data, updateData, nextStep, prevStep }) {
  const [style, setStyle] = useState(data.stylePreferences || {
    theme: 'professional',
    primaryColor: '#4B96FF',
    secondaryColor: '#FFA2B6',
    fontFamily: 'sans-serif',
    layout: 'standard'
  });

  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);

  const handleChange = (field, value) => {
    setStyle(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ stylePreferences: style });
    nextStep();
  };

  const themes = ['professional', 'minimal', 'creative', 'modern', 'dark', 'colorful'];
  const layouts = ['standard', 'timeline', 'card', 'split'];

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
                Style Preferences
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Portfolio Theme Section */}
              <div className="group">
                <label className="block text-sm font-semibold text-cyan-300 mb-4 tracking-wide uppercase">
                  Portfolio Theme*
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => handleChange('theme', theme)}
                      className={`relative px-6 py-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 overflow-hidden group ${
                        style.theme === theme 
                          ? 'border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-400/25' 
                          : 'border-gray-600 bg-gray-900/30 hover:border-cyan-300/50'
                      }`}
                    >
                      <span className="capitalize text-white font-semibold relative z-10">{theme}</span>
                      {style.theme === theme && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color Selection Section */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Primary Color */}
                <div className="group">
                  <label className="block text-sm font-semibold text-purple-300 mb-4 tracking-wide uppercase">
                    Primary Color
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                      className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 hover:border-purple-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-400/25"
                    >
                      <div 
                        className="h-8 w-8 rounded-full border-2 border-white/30 shadow-lg relative overflow-hidden" 
                        style={{ backgroundColor: style.primaryColor }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      </div>
                      <span className="text-white font-semibold flex-1 text-left">{style.primaryColor}</span>
                      <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showPrimaryPicker && (
                      <div className="absolute z-20 mt-2 p-4 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-400/30">
                        <HexColorPicker 
                          color={style.primaryColor} 
                          onChange={(color) => handleChange('primaryColor', color)} 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPrimaryPicker(false)}
                          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Secondary Color */}
                <div className="group">
                  <label className="block text-sm font-semibold text-pink-300 mb-4 tracking-wide uppercase">
                    Secondary Color
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
                      className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 hover:border-pink-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-pink-400/25"
                    >
                      <div 
                        className="h-8 w-8 rounded-full border-2 border-white/30 shadow-lg relative overflow-hidden" 
                        style={{ backgroundColor: style.secondaryColor }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      </div>
                      <span className="text-white font-semibold flex-1 text-left">{style.secondaryColor}</span>
                      <svg className="w-5 h-5 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showSecondaryPicker && (
                      <div className="absolute z-20 mt-2 p-4 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-400/30">
                        <HexColorPicker 
                          color={style.secondaryColor} 
                          onChange={(color) => handleChange('secondaryColor', color)} 
                        />
                        <button
                          type="button"
                          onClick={() => setShowSecondaryPicker(false)}
                          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Font Family Section */}
              <div className="group">
                <label className="block text-sm font-semibold text-emerald-300 mb-4 tracking-wide uppercase">
                  Font Family*
                </label>
                <div className="relative">
                  <select
                    value={style.fontFamily}
                    onChange={(e) => handleChange('fontFamily', e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/25 transition-all duration-300 hover:border-gray-600 appearance-none cursor-pointer"
                  >
                    <option value="sans-serif">Sans-serif (Modern)</option>
                    <option value="serif">Serif (Traditional)</option>
                    <option value="monospace">Monospace (Technical)</option>
                    <option value="cursive">Cursive (Creative)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Layout Style Section */}
              <div className="group">
                <label className="block text-sm font-semibold text-orange-300 mb-4 tracking-wide uppercase">
                  Layout Style*
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {layouts.map((layout) => (
                    <button
                      key={layout}
                      type="button"
                      onClick={() => handleChange('layout', layout)}
                      className={`relative px-6 py-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 overflow-hidden group ${
                        style.layout === layout 
                          ? 'border-orange-400 bg-orange-400/20 shadow-lg shadow-orange-400/25' 
                          : 'border-gray-600 bg-gray-900/30 hover:border-orange-300/50'
                      }`}
                    >
                      <span className="capitalize text-white font-semibold relative z-10">{layout}</span>
                      {style.layout === layout && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-yellow-400/10 animate-pulse"></div>
                      )}
                    </button>
                  ))}
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