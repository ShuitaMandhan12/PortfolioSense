// src/context/PortfolioContext.jsx
import { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    professionalTitle: '',
    profilePicture: null,
    bio: '',
    
    // Contact Information
    email: '',
    phone: '',
    location: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      portfolio: '',
      blog: ''
    },
    
    // All other sections initialized here
    // ...
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 15; // Update as you add more steps

  const updateFormData = (section, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <PortfolioContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        totalSteps,
        nextStep,
        prevStep
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);