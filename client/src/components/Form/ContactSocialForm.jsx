import { useState } from 'react';

export default function ContactSocialForm({ data = {}, updateData, nextStep, prevStep }) {
  const [formState, setFormState] = useState({
    email: data.email || '',
    phone: data.phone || '',
    location: data.location || '',
    socialLinks: {
      linkedin: data.socialLinks?.linkedin || '',
      github: data.socialLinks?.github || '',
      twitter: data.socialLinks?.twitter || '',
      portfolio: data.socialLinks?.portfolio || ''
    }
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSocialChange = (platform, value) => {
    setFormState(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (updateData && typeof updateData === 'function') {
      updateData(formState);
    }
    
    if (nextStep && typeof nextStep === 'function') {
      nextStep();
    }
  };

  const handlePrevStep = () => {
    if (prevStep && typeof prevStep === 'function') {
      prevStep();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
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
                Contact & Social Links
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-8">
              {/* Email and Phone Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-cyan-300 mb-3 tracking-wide uppercase">
                    Email*
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 ${
                        errors.email ? 'border-red-400' : 'border-gray-700'
                      } text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 hover:border-gray-600`}
                      placeholder="your.email@example.com"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-purple-300 mb-3 tracking-wide uppercase">
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:border-gray-600"
                      placeholder="+1 (555) 123-4567"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>
              
              {/* Location */}
              <div className="group">
                <label className="block text-sm font-semibold text-emerald-300 mb-3 tracking-wide uppercase">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/25 transition-all duration-300 hover:border-gray-600"
                    placeholder="City, Country"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-blue-300 mb-3 tracking-wide uppercase">
                    LinkedIn
                  </label>
                  <div className="relative flex rounded-2xl overflow-hidden">
                    <span className="inline-flex items-center px-4 bg-gray-800/80 text-gray-300 text-sm font-medium border-2 border-r-0 border-gray-700 group-hover:border-blue-400 transition-colors duration-300">
                      linkedin.com/in/
                    </span>
                    <input
                      type="text"
                      value={formState.socialLinks.linkedin}
                      onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                      className="flex-1 px-4 py-4 bg-gray-900/50 border-2 border-l-0 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/25 transition-all duration-300 hover:border-gray-600"
                      placeholder="yourusername"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-indigo-300 mb-3 tracking-wide uppercase">
                    GitHub
                  </label>
                  <div className="relative flex rounded-2xl overflow-hidden">
                    <span className="inline-flex items-center px-4 bg-gray-800/80 text-gray-300 text-sm font-medium border-2 border-r-0 border-gray-700 group-hover:border-indigo-400 transition-colors duration-300">
                      github.com/
                    </span>
                    <input
                      type="text"
                      value={formState.socialLinks.github}
                      onChange={(e) => handleSocialChange('github', e.target.value)}
                      className="flex-1 px-4 py-4 bg-gray-900/50 border-2 border-l-0 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:shadow-lg focus:shadow-indigo-400/25 transition-all duration-300 hover:border-gray-600"
                      placeholder="yourusername"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-pink-300 mb-3 tracking-wide uppercase">
                    Twitter
                  </label>
                  <div className="relative flex rounded-2xl overflow-hidden">
                    <span className="inline-flex items-center px-4 bg-gray-800/80 text-gray-300 text-sm font-medium border-2 border-r-0 border-gray-700 group-hover:border-pink-400 transition-colors duration-300">
                      twitter.com/
                    </span>
                    <input
                      type="text"
                      value={formState.socialLinks.twitter}
                      onChange={(e) => handleSocialChange('twitter', e.target.value)}
                      className="flex-1 px-4 py-4 bg-gray-900/50 border-2 border-l-0 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/25 transition-all duration-300 hover:border-gray-600"
                      placeholder="yourhandle"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-violet-300 mb-3 tracking-wide uppercase">
                    Portfolio Website
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formState.socialLinks.portfolio}
                      onChange={(e) => handleSocialChange('portfolio', e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:shadow-lg focus:shadow-violet-400/25 transition-all duration-300 hover:border-gray-600"
                      placeholder="https://yourportfolio.com"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="group relative px-8 py-4 bg-gray-800/60 hover:bg-gray-700/60 text-white font-bold rounded-2xl border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-105 transform overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    <span>Back</span>
                  </span>
                </button>
                <button
                  type="button"
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