import { useState } from 'react';

export default function PersonalInfoForm({ data = {}, updateData = () => {}, nextStep = () => {} }) {
  const [formState, setFormState] = useState({
    fullName: data.fullName || '',
    professionalTitle: data.professionalTitle || '',
    bio: data.bio || '',
    profilePicture: data.profilePicture || null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormState(prev => ({ ...prev, profilePicture: e.target.files[0] }));
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
                Personal Information
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-8">
              {/* Name and Title Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-cyan-300 mb-3 tracking-wide uppercase">
                    Full Name*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formState.fullName}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 hover:border-gray-600"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-purple-300 mb-3 tracking-wide uppercase">
                    Professional Title*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="professionalTitle"
                      value={formState.professionalTitle}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:border-gray-600"
                      placeholder="e.g. Full Stack Developer"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>
              
              {/* Profile Picture Section */}
              <div className="group">
                <label className="block text-sm font-semibold text-pink-300 mb-4 tracking-wide uppercase">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-6 p-6 rounded-2xl bg-gray-900/30 border-2 border-dashed border-gray-600 hover:border-pink-400 transition-all duration-300">
                  <div className="shrink-0 relative">
                    {formState.profilePicture ? (
                      <div className="relative">
                        <img 
                          src={URL.createObjectURL(formState.profilePicture)} 
                          alt="Profile" 
                          className="h-20 w-20 rounded-full object-cover border-4 border-pink-400 shadow-lg shadow-pink-400/30"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/20 to-purple-400/20 animate-pulse"></div>
                      </div>
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 border-4 border-dashed border-gray-500 flex items-center justify-center group-hover:border-pink-400 transition-colors duration-300">
                        <span className="text-gray-400 text-sm font-medium group-hover:text-pink-300 transition-colors duration-300">Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="cursor-pointer">
                      <span className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 hover:scale-105 transform">
                        Choose Photo
                      </span>
                      <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="sr-only"
                        accept="image/*"
                      />
                    </label>
                    <p className="text-gray-400 text-sm mt-2">Upload a professional photo (JPG, PNG)</p>
                  </div>
                </div>
              </div>
              
              {/* Bio Section */}
              <div className="group">
                <label className="block text-sm font-semibold text-emerald-300 mb-3 tracking-wide uppercase">
                  Bio*
                </label>
                <div className="relative">
                  <textarea
                    name="bio"
                    value={formState.bio}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/25 transition-all duration-300 hover:border-gray-600 resize-none"
                    placeholder="Tell us about yourself, your experience, and what makes you unique..."
                    required
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
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