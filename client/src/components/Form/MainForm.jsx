// src/components/Form/MainForm.jsx
import { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import ContactSocialForm from './ContactSocialForm';
import SkillsProjectsForm from './SkillsProjectsForm';
import WorkExperienceForm from './WorkExperienceForm';
import EducationCertificationsForm from './EducationCertificationsForm';
import HobbiesLanguagesForm from './HobbiesLanguagesForm';
import AchievementsForm from './AchievementsForm';
import TestimonialsForm from './TestimonialsForm';
import StylePreferencesForm from './StylePreferencesForm';
import ResumeUploadForm from './ResumeUploadForm';
import CustomSectionsForm from './CustomSectionsForm';
import FinalSubmissionForm from './FinalSubmissionForm';

export default function MainForm() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [portfolioId, setPortfolioId] = useState(null);
  
  // Consolidated form state
  const [formData, setFormData] = useState({
    // Personal Information
    personalInfo: {
      fullName: '',
      professionalTitle: '',
      profilePicture: null,
      bio: ''
    },
    
    // Contact & Social
    contactInfo: {
      email: '',
      phone: '',
      location: '',
      socialLinks: {
        linkedin: '',
        github: '',
        twitter: '',
        portfolio: '',
        blog: ''
      }
    },
    
    // Skills & Projects
    skills: [],
    projects: [],
    
    // Work Experience
    workExperience: [],
    
    // Education & Certifications
    education: [],
    certifications: [],
    
    // Hobbies & Languages
    hobbies: [],
    languages: [],
    
    // Achievements
    achievements: [],
    
    // Testimonials
    testimonials: [],
    
    // Style Preferences
    stylePreferences: {
      theme: 'professional',
      primaryColor: '#4B96FF',
      secondaryColor: '#FFA2B6',
      fontFamily: 'sans-serif',
      layout: 'standard'
    },
    
    // Resume
    resume: null,
    
    // Custom Sections
    customSections: []
  });

  // Update form data for any section
  const updateFormData = (section, data) => {
  setFormData(prev => {
    const prevSection = prev[section];
    const isArraySection = Array.isArray(prevSection);
    
    return {
      ...prev,
      [section]: isArraySection 
        ? Array.isArray(data) ? [...data] : []  // fallback or throw error
        : { ...prevSection, ...data }
    };
  });
};


  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleGeneratePortfolio = async (options) => {
    setIsGenerating(true);
    try {
      // Here you would call your backend API
      console.log('Submitting data:', { ...formData, options });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock portfolio ID
      const mockId = `portfolio-${Math.random().toString(36).substr(2, 9)}`;
      setPortfolioId(mockId);
      nextStep();
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate portfolio. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate progress percentage
  const progressPercentage = (step / 12) * 100; // We have 12 steps now

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00178F] via-[#4B96FF] to-[#FFA2B6] py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Enhanced Progress Bar */}
        <div className="bg-white/20 h-2.5">
          <div 
            className="bg-gradient-to-r from-[#4B96FF] to-[#FFA2B6] h-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="p-6 md:p-8">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <PersonalInfoForm 
              data={formData.personalInfo} 
              updateData={(data) => updateFormData('personalInfo', data)}
              nextStep={nextStep}
            />
          )}
          
          {/* Step 2: Contact & Social */}
          {step === 2 && (
            <ContactSocialForm 
              data={formData.contactInfo} 
              updateData={(data) => updateFormData('contactInfo', data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {/* Step 3: Skills & Projects */}
          {step === 3 && (
            <SkillsProjectsForm 
              data={{ skills: formData.skills, projects: formData.projects }}
              updateData={(section, data) => updateFormData(section, data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {/* Step 4: Work Experience */}
          {step === 4 && (
            <WorkExperienceForm 
              data={formData.workExperience}
              updateData={(data) => updateFormData('workExperience', data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {/* Step 5: Education & Certifications */}
          {step === 5 && (
            <EducationCertificationsForm 
              data={{ education: formData.education, certifications: formData.certifications }}
              updateData={(section, data) => updateFormData(section, data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {/* Step 6: Hobbies & Languages */}
          {step === 6 && (
            <HobbiesLanguagesForm 
              data={{ hobbies: formData.hobbies, languages: formData.languages }}
              updateData={(section, data) => updateFormData(section, data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {/* Step 7: Achievements */}
          {step === 7 && (
            <AchievementsForm 
              data={formData.achievements}
              updateData={(data) => updateFormData('achievements', data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {/* Step 8: Testimonials */}
          {step === 8 && (
            <TestimonialsForm 
              data={formData.testimonials}
              updateData={(data) => updateFormData('testimonials', data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {/* Step 9: Style Preferences */}
          {step === 9 && (
            <StylePreferencesForm 
              data={formData.stylePreferences}
              updateData={(data) => updateFormData('stylePreferences', data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {/* Step 10: Resume Upload */}
          {step === 10 && (
            <ResumeUploadForm 
              data={formData.resume}
              updateData={(data) => updateFormData('resume', data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {/* Step 11: Custom Sections */}
          {step === 11 && (
            <CustomSectionsForm 
              data={formData.customSections}
              updateData={(data) => updateFormData('customSections', data)}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          
          {/* Step 12: Final Submission */}
          {step === 12 && (
            <FinalSubmissionForm 
              data={formData}
              onGenerate={handleGeneratePortfolio}
              prevStep={prevStep}
              isLoading={isGenerating}
            />
          )}
          
          {/* Success Screen */}
          {step === 13 && portfolioId && (
            <div className="text-center py-12">
              <div className="mb-8">
                <svg className="mx-auto h-16 w-16 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">Portfolio Created Successfully!</h2>
              <p className="text-white/80 mb-8">Here's your unique portfolio link:</p>
              
              <div className="flex items-center justify-center max-w-md mx-auto mb-8">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/portfolio/${portfolioId}`}
                  className="flex-1 px-4 py-3 rounded-l-lg bg-white/10 border border-white/20 text-white truncate"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(`${window.location.origin}/portfolio/${portfolioId}`)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-l-0 border-white/20 text-white rounded-r-lg transition-colors"
                >
                  Copy
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={`/portfolio/${portfolioId}`}
                  className="px-6 py-3 bg-gradient-to-r from-[#4B96FF] to-[#FFA2B6] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Portfolio
                </a>
                <button
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      // Reset all form data
                      personalInfo: { fullName: '', professionalTitle: '', profilePicture: null, bio: '' },
                      contactInfo: { email: '', phone: '', location: '', socialLinks: {} },
                      // ... other resets
                    });
                  }}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-lg transition-colors"
                >
                  Create Another
                </button>
              </div>
            </div>
          )}
          
          
        </div>
      </div>
    </div>
  );
}

// // src/components/Form/MainForm.jsx
// import { useState } from 'react';
// import PersonalInfoForm from './PersonalInfoForm';
// import ContactSocialForm from './ContactSocialForm';
// import SkillsProjectsForm from './SkillsProjectsForm';
// import WorkExperienceForm from './WorkExperienceForm';
// import EducationCertificationsForm from './EducationCertificationsForm';
// import HobbiesLanguagesForm from './HobbiesLanguagesForm';
// import AchievementsForm from './AchievementsForm';
// import TestimonialsForm from './TestimonialsForm';
// import StylePreferencesForm from './StylePreferencesForm';
// import ResumeUploadForm from './ResumeUploadForm';
// import CustomSectionsForm from './CustomSectionsForm';
// import FinalSubmissionForm from './FinalSubmissionForm';

// export default function MainForm() {
//   const [step, setStep] = useState(1);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [portfolioId, setPortfolioId] = useState(null);
  
//   // Consolidated form state
//   const [formData, setFormData] = useState({
//     // Personal Information
//     personalInfo: {
//       fullName: '',
//       professionalTitle: '',
//       profilePicture: null,
//       bio: ''
//     },
    
//     // Contact & Social
//     contactInfo: {
//       email: '',
//       phone: '',
//       location: '',
//       socialLinks: {
//         linkedin: '',
//         github: '',
//         twitter: '',
//         portfolio: '',
//         blog: ''
//       }
//     },
    
//     // Skills & Projects
//     skills: [],
//     projects: [],
    
//     // Work Experience
//     workExperience: [],
    
//     // Education & Certifications
//     education: [],
//     certifications: [],
    
//     // Hobbies & Languages
//     hobbies: [],
//     languages: [],
    
//     // Achievements
//     achievements: [],
    
//     // Testimonials
//     testimonials: [],
    
//     // Style Preferences
//     stylePreferences: {
//       theme: 'professional',
//       primaryColor: '#4B96FF',
//       secondaryColor: '#FFA2B6',
//       fontFamily: 'sans-serif',
//       layout: 'standard'
//     },
    
//     // Resume
//     resume: null,
    
//     // Custom Sections
//     customSections: []
//   });

//   // Update form data for any section
//   const updateFormData = (section, data) => {
//     setFormData(prev => {
//       const prevSection = prev[section];
//       const isArraySection = Array.isArray(prevSection);
      
//       return {
//         ...prev,
//         [section]: isArraySection 
//           ? Array.isArray(data) ? [...data] : []  // fallback or throw error
//           : { ...prevSection, ...data }
//       };
//     });
//   };

//   const nextStep = () => setStep(prev => prev + 1);
//   const prevStep = () => setStep(prev => prev - 1);

//   const handleGeneratePortfolio = async (options) => {
//     setIsGenerating(true);
//     try {
//       // Here you would call your backend API
//       console.log('Submitting data:', { ...formData, options });
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Generate a mock portfolio ID
//       const mockId = `portfolio-${Math.random().toString(36).substr(2, 9)}`;
//       setPortfolioId(mockId);
//       nextStep();
//     } catch (error) {
//       console.error('Generation error:', error);
//       alert('Failed to generate portfolio. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Calculate progress percentage
//   const progressPercentage = (step / 12) * 100; // We have 12 steps now

//   // Step names for better UX
//   const stepNames = [
//     'Personal Info', 'Contact & Social', 'Skills & Projects', 'Work Experience',
//     'Education', 'Interests', 'Achievements', 'Testimonials',
//     'Style Preferences', 'Resume Upload', 'Custom Sections', 'Final Review'
//   ];

//   return (
//     <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
//       </div>

//       {/* Enhanced Progress Bar */}
//       <div className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
//         {/* Progress Track */}
//         <div className="h-2 bg-gradient-to-r from-gray-800 to-gray-700 relative overflow-hidden">
//           <div 
//             className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all duration-700 ease-out relative"
//             style={{ width: `${progressPercentage}%` }}
//           >
//             {/* Animated shine effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
//           </div>
//           {/* Progress glow */}
//           <div 
//             className="absolute top-0 h-full bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-pink-400/50 blur-sm transition-all duration-700 ease-out"
//             style={{ width: `${progressPercentage}%` }}
//           ></div>
//         </div>
        
//         {/* Step Info */}
//         <div className="px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
//                 {step > 12 ? '✓' : step}
//               </div>
//               <div>
//                 <p className="text-white font-semibold text-sm">
//                   {step > 12 ? 'Complete!' : stepNames[step - 1]}
//                 </p>
//                 <p className="text-gray-300 text-xs">
//                   {step > 12 ? 'Portfolio Generated' : `Step ${step} of 12`}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           {/* Progress percentage */}
//           <div className="text-right">
//             <p className="text-white font-bold text-lg">
//               {step > 12 ? '100' : Math.round(progressPercentage)}%
//             </p>
//             <p className="text-gray-300 text-xs">Complete</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area - Full height minus progress bar */}
//       <div className="flex-1 relative z-10 overflow-hidden">
//         {/* Step 1: Personal Information */}
//         {step === 1 && (
//           <PersonalInfoForm 
//             data={formData.personalInfo} 
//             updateData={(data) => updateFormData('personalInfo', data)}
//             nextStep={nextStep}
//           />
//         )}
        
//         {/* Step 2: Contact & Social */}
//         {step === 2 && (
//           <ContactSocialForm 
//             data={formData.contactInfo} 
//             updateData={(data) => updateFormData('contactInfo', data)}
//             nextStep={nextStep}
//             prevStep={prevStep}
//           />
//         )}
        
//         {/* Step 3: Skills & Projects */}
//         {step === 3 && (
//           <SkillsProjectsForm 
//             data={{ skills: formData.skills, projects: formData.projects }}
//             updateData={(section, data) => updateFormData(section, data)}
//             nextStep={nextStep}
//             prevStep={prevStep}
//           />
//         )}
        
//         {/* Step 4: Work Experience */}
//         {step === 4 && (
//           <WorkExperienceForm 
//             data={formData.workExperience}
//             updateData={(data) => updateFormData('workExperience', data)}
//             nextStep={nextStep}
//             prevStep={prevStep}
//           />
//         )}
        
//         {/* Step 5: Education & Certifications */}
//         {step === 5 && (
//           <EducationCertificationsForm 
//             data={{ education: formData.education, certifications: formData.certifications }}
//             updateData={(section, data) => updateFormData(section, data)}
//             nextStep={nextStep}
//             prevStep={prevStep}
//           />
//         )}
        
//         {/* Step 6: Hobbies & Languages */}
//         {step === 6 && (
//           <HobbiesLanguagesForm 
//             data={{ hobbies: formData.hobbies, languages: formData.languages }}
//             updateData={(section, data) => updateFormData(section, data)}
//             nextStep={nextStep}
//             prevStep={prevStep}
//           />
//         )}
        
//         {/* Step 7: Achievements */}
//         {step === 7 && (
//           <AchievementsForm 
//             data={formData.achievements}
//             updateData={(data) => updateFormData('achievements', data)}
//             nextStep={nextStep}
//             prevStep={prevStep}
//           />
//         )}
        
//         {/* Step 8: Testimonials */}
//         {step === 8 && (
//           <TestimonialsForm 
//             data={formData.testimonials}
//             updateData={(data) => updateFormData('testimonials', data)}
//             nextStep={nextStep}
//             prevStep={prevStep}
//           />
//         )}
        
//         {/* Step 9: Style Preferences */}
//         {step === 9 && (
//           <StylePreferencesForm 
//             data={formData.stylePreferences}
//             updateData={(data) => updateFormData('stylePreferences', data)}
//             nextStep={nextStep}
//             prevStep={prevStep}
//           />
//         )}
        
//         {/* Step 10: Resume Upload */}
//         {step === 10 && (
//           <ResumeUploadForm 
//             data={formData.resume}
//             updateData={(data) => updateFormData('resume', data)}
//             nextStep={nextStep}
//             prevStep={prevStep}
//           />
//         )}
        
//         {/* Step 11: Custom Sections */}
//         {step === 11 && (
//           <CustomSectionsForm 
//             data={formData.customSections}
//             updateData={(data) => updateFormData('customSections', data)}
//             nextStep={nextStep}
//             prevStep={prevStep}
//           />
//         )}
        
//         {/* Step 12: Final Submission */}
//         {step === 12 && (
//           <FinalSubmissionForm 
//             data={formData}
//             onGenerate={handleGeneratePortfolio}
//             prevStep={prevStep}
//             isLoading={isGenerating}
//           />
//         )}
        
//         {/* Success Screen */}
//         {step === 13 && portfolioId && (
//           <div className="h-full flex items-center justify-center p-4">
//             <div className="w-full max-w-2xl">
//               {/* Main container */}
//               <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/20 overflow-hidden relative group">
//                 {/* Neon border animation */}
//                 <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
//                 <div className="absolute inset-[1px] rounded-3xl bg-black/80 backdrop-blur-xl"></div>
                
//                 <div className="relative p-8 md:p-10 text-center">
//                   {/* Success Icon */}
//                   <div className="mb-8 relative">
//                     <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center shadow-2xl shadow-emerald-400/30">
//                       <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     {/* Pulsing rings */}
//                     <div className="absolute inset-0 rounded-full border-4 border-emerald-400/30 animate-ping"></div>
//                     <div className="absolute inset-2 rounded-full border-2 border-cyan-400/50 animate-pulse"></div>
//                   </div>
                  
//                   <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
//                     Portfolio Created!
//                   </h2>
//                   <p className="text-gray-300 mb-8 text-lg">Your stunning portfolio is ready to shine</p>
                  
//                   {/* Portfolio Link */}
//                   <div className="bg-gray-900/50 border-2 border-gray-700 rounded-2xl p-6 mb-8 hover:border-cyan-400 transition-all duration-300">
//                     <p className="text-cyan-300 font-semibold mb-3 tracking-wide uppercase text-sm">Your Portfolio Link</p>
//                     <div className="flex items-center space-x-2">
//                       <input
//                         type="text"
//                         readOnly
//                         value={`${window.location.origin}/portfolio/${portfolioId}`}
//                         className="flex-1 px-4 py-3 rounded-xl bg-black/50 border border-gray-600 text-white text-center truncate focus:outline-none focus:border-cyan-400"
//                       />
//                       <button
//                         onClick={() => navigator.clipboard.writeText(`${window.location.origin}/portfolio/${portfolioId}`)}
//                         className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transform"
//                         title="Copy to clipboard"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
                  
//                   {/* Action Buttons */}
//                   <div className="flex flex-col sm:flex-row justify-center gap-4">
//                     <a
//                       href={`/portfolio/${portfolioId}`}
//                       className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 transform overflow-hidden"
//                     >
//                       <span className="relative z-10 flex items-center justify-center space-x-2">
//                         <span>View Portfolio</span>
//                         <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       </span>
//                       <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     </a>
                    
//                     <button
//                       onClick={() => {
//                         setStep(1);
//                         setPortfolioId(null);
//                         setFormData({
//                           personalInfo: { fullName: '', professionalTitle: '', profilePicture: null, bio: '' },
//                           contactInfo: { email: '', phone: '', location: '', socialLinks: {} },
//                           skills: [], projects: [], workExperience: [], education: [], certifications: [],
//                           hobbies: [], languages: [], achievements: [], testimonials: [],
//                           stylePreferences: { theme: 'professional', primaryColor: '#4B96FF', secondaryColor: '#FFA2B6', fontFamily: 'sans-serif', layout: 'standard' },
//                           resume: null, customSections: []
//                         });
//                       }}
//                       className="group relative px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-bold rounded-2xl border-2 border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-105 transform overflow-hidden"
//                     >
//                       <span className="relative z-10 flex items-center justify-center space-x-2">
//                         <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                         </svg>
//                         <span>Create Another</span>
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }