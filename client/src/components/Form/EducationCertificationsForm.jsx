import { useState } from 'react';

export default function EducationCertificationsForm({ data = {}, updateData = () => {}, nextStep = () => {}, prevStep = () => {} }) {
  const [education, setEducation] = useState(data?.education || [{
    degree: '',
    institution: '',
    startYear: '',
    endYear: '',
    gpa: ''
  }]);

  const [certifications, setCertifications] = useState(data?.certifications || [{
    name: '',
    organization: '',
    year: '',
    credentialId: ''
  }]);

  // Education handlers
  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const addEducation = () => {
    setEducation([...education, {
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
      gpa: ''
    }]);
  };

  const removeEducation = (index) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  // Certification handlers
  const handleCertificationChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    setCertifications(updated);
  };

  const addCertification = () => {
    setCertifications([...certifications, {
      name: '',
      organization: '',
      year: '',
      credentialId: ''
    }]);
  };

  const removeCertification = (index) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ education, certifications });
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

      <div className="relative w-full max-w-5xl">
        {/* Main container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/20 overflow-hidden relative group">
          {/* Neon border animation */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
          <div className="absolute inset-[1px] rounded-3xl bg-black/80 backdrop-blur-xl"></div>
          
          <div className="relative p-8 md:p-10 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Education & Certifications
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-10">
              {/* Education Section */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-300">Education</h3>
                </div>
                
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="bg-gray-900/30 backdrop-blur-sm border-2 border-gray-700 rounded-2xl p-6 relative group hover:border-emerald-400/50 transition-all duration-300">
                      {/* Education card glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative space-y-6">
                        {/* Degree and Institution Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-emerald-300 mb-3 tracking-wide uppercase">
                              Degree*
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/25 transition-all duration-300 hover:border-gray-600"
                                placeholder="e.g. Bachelor of Science"
                                required
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                          
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-cyan-300 mb-3 tracking-wide uppercase">
                              Institution*
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 hover:border-gray-600"
                                placeholder="e.g. University of Technology"
                                required
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Years and GPA Row */}
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-purple-300 mb-3 tracking-wide uppercase">
                              Start Year*
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                min="1900"
                                max="2099"
                                value={edu.startYear}
                                onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:border-gray-600"
                                required
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                          
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-pink-300 mb-3 tracking-wide uppercase">
                              End Year*
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                min="1900"
                                max="2099"
                                value={edu.endYear}
                                onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/25 transition-all duration-300 hover:border-gray-600"
                                required
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                          
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-yellow-300 mb-3 tracking-wide uppercase">
                              GPA
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={edu.gpa}
                                onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:shadow-lg focus:shadow-yellow-400/25 transition-all duration-300 hover:border-gray-600"
                                placeholder="4.0"
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Remove Education Button */}
                        {education.length > 1 && (
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => removeEducation(index)}
                              className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-all duration-300 font-medium"
                            >
                              Remove Education
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Education Button */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={addEducation}
                      className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border-2 border-emerald-500/30 text-emerald-300 font-semibold rounded-2xl hover:from-emerald-600/30 hover:to-cyan-600/30 hover:border-emerald-400 transition-all duration-300 hover:scale-105 transform"
                    >
                      <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
                      <span>Add Another Education</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Certifications Section */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-300">Certifications</h3>
                </div>
                
                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-gray-900/30 backdrop-blur-sm border-2 border-gray-700 rounded-2xl p-6 relative group hover:border-purple-400/50 transition-all duration-300">
                      {/* Certification card glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative space-y-6">
                        {/* Certification Name and Organization Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-purple-300 mb-3 tracking-wide uppercase">
                              Certification Name*
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:border-gray-600"
                                placeholder="e.g. AWS Solutions Architect"
                                required
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                          
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-pink-300 mb-3 tracking-wide uppercase">
                              Organization*
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={cert.organization}
                                onChange={(e) => handleCertificationChange(index, 'organization', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/25 transition-all duration-300 hover:border-gray-600"
                                placeholder="e.g. Amazon Web Services"
                                required
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Year and Credential ID Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-cyan-300 mb-3 tracking-wide uppercase">
                              Year Obtained*
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                min="1900"
                                max="2099"
                                value={cert.year}
                                onChange={(e) => handleCertificationChange(index, 'year', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 hover:border-gray-600"
                                required
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                          
                          <div className="group/input">
                            <label className="block text-sm font-semibold text-emerald-300 mb-3 tracking-wide uppercase">
                              Credential ID
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={cert.credentialId}
                                onChange={(e) => handleCertificationChange(index, 'credentialId', e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/25 transition-all duration-300 hover:border-gray-600"
                                placeholder="Optional"
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Remove Certification Button */}
                        {certifications.length > 1 && (
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => removeCertification(index)}
                              className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-all duration-300 font-medium"
                            >
                              Remove Certification
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Certification Button */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={addCertification}
                      className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500/30 text-purple-300 font-semibold rounded-2xl hover:from-purple-600/30 hover:to-pink-600/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 transform"
                    >
                      <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
                      <span>Add Another Certification</span>
                    </button>
                  </div>
                </div>
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