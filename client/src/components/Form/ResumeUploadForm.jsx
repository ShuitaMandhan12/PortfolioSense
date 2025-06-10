// src/components/Form/ResumeUploadForm.jsx
import { useState } from 'react';

export default function ResumeUploadForm({ data, updateData, nextStep, prevStep }) {
  // Initialize with empty object if data is null/undefined
  const formData = data || {};
  const [resumeFile, setResumeFile] = useState(formData.resume || null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseSuccess, setParseSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
    setParseSuccess(false);
  };

  const handleParseResume = async () => {
    if (!resumeFile) return;
    
    setIsParsing(true);
    try {
      // Simulate parsing - in real app you would call your API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setParseSuccess(true);
      alert('Resume parsed successfully! Some fields have been auto-filled.');
    } catch (error) {
      alert('Failed to parse resume. Please fill manually.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ resume: resumeFile });
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

      <div className="relative w-full max-w-3xl">
        {/* Main container */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/20 overflow-hidden relative group">
          {/* Neon border animation */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
          <div className="absolute inset-[1px] rounded-3xl bg-black/80 backdrop-blur-xl"></div>
          
          <div className="relative p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Resume Upload
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Upload Area */}
              <div className="group">
                <div className="relative border-2 border-dashed border-cyan-400/30 rounded-2xl p-12 text-center transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/5">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <svg className="h-16 w-16 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {resumeFile ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-3 p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
                          <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-green-300 font-semibold">{resumeFile.name}</span>
                        </div>
                        <p className="text-cyan-200 text-lg">File uploaded successfully!</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-white text-xl font-semibold">Upload your resume</p>
                        <p className="text-cyan-200">PDF, DOC, or DOCX format recommended</p>
                      </div>
                    )}
                    
                    <label className="inline-block group cursor-pointer">
                      <div className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl shadow-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 transform">
                        <span className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l3-3m0 0l3 3m-3-3v12" />
                          </svg>
                          <span>{resumeFile ? 'Change File' : 'Choose File'}</span>
                        </span>
                      </div>
                      <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                    
                    {resumeFile && (
                      <button
                        type="button"
                        onClick={handleParseResume}
                        disabled={isParsing || parseSuccess}
                        className={`inline-flex items-center px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                          parseSuccess 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30' 
                            : isParsing
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white opacity-75'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 hover:shadow-blue-500/30'
                        }`}
                      >
                        {isParsing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Parsing Resume...
                          </>
                        ) : parseSuccess ? (
                          <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Parsed Successfully!
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Parse & Auto-fill
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Info Section */}
              <div className="bg-gray-900/30 border border-purple-400/30 rounded-2xl p-6 group hover:bg-gray-900/40 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-200 transition-colors duration-300">
                      Smart Resume Parsing
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Uploading a resume is optional but highly recommended. Our AI will intelligently extract and organize your work experience, education, skills, and achievements to automatically populate your portfolio sections, saving you time and ensuring nothing important is missed.
                    </p>
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