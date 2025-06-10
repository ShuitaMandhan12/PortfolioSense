import { useState, useEffect } from 'react';

export default function SkillsProjectsForm({ data = {}, updateData, nextStep, prevStep }) {
  const [formState, setFormState] = useState({
    skills: data.skills || [],
    projects: data.projects || [{ title: '', description: '' }]
  });

  const [newSkill, setNewSkill] = useState('');

  // Sync with parent data when it changes
  useEffect(() => {
    setFormState({
      skills: data.skills || [],
      projects: data.projects || [{ title: '', description: '' }]
    });
  }, [data]);

  // Skills handlers
  const handleAddSkill = () => {
    if (newSkill.trim() && !formState.skills.includes(newSkill.trim())) {
      setFormState(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormState(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Projects handlers
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formState.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setFormState(prev => ({ ...prev, projects: updatedProjects }));
  };

  const addProject = () => {
    setFormState(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '' }]
    }));
  };

  const removeProject = (index) => {
    if (formState.projects.length > 1) {
      setFormState(prev => ({
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    // Check if all projects have required fields
    return formState.projects.every(project => 
      project.title.trim() !== '' && project.description.trim() !== ''
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields for all projects.');
      return;
    }

    // Call updateData if it exists
    if (updateData) {
      updateData(formState);
    }
    
    // Call nextStep if it exists
    if (nextStep) {
      nextStep();
    }
  };

  const handlePrevious = () => {
    // Update data before going back
    if (updateData) {
      updateData(formState);
    }
    
    // Call prevStep if it exists
    if (prevStep) {
      prevStep();
    }
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
          
          <form onSubmit={handleSubmit} className="relative p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Skills & Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-8">
              {/* Skills Section */}
              <div>
                <h3 className="text-2xl font-bold text-cyan-300 mb-6 tracking-wide uppercase">Your Skills</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {formState.skills.map((skill, index) => (
                    <div key={index} className="group flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-400/30 hover:border-purple-300 transition-all duration-300 transform hover:scale-105">
                      <span className="text-white font-medium">{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-3 text-pink-300 hover:text-pink-200 text-xl font-bold transition-colors duration-300"
                        aria-label={`Remove ${skill} skill`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 group">
                    <div className="relative">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/25 transition-all duration-300 hover:border-gray-600"
                        placeholder="Add a skill"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 transform"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {/* Projects Section */}
              <div>
                <h3 className="text-2xl font-bold text-purple-300 mb-6 tracking-wide uppercase">Your Projects</h3>
                <div className="space-y-6">
                  {formState.projects.map((project, index) => (
                    <div key={index} className="bg-gray-900/30 backdrop-blur-sm border-2 border-gray-700 rounded-2xl p-6 group hover:border-purple-400 transition-all duration-300">
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-cyan-300 mb-3 tracking-wide uppercase">
                          Project Title*
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 hover:border-gray-600"
                            required
                            placeholder="Enter project title"
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-pink-300 mb-3 tracking-wide uppercase">
                          Description*
                        </label>
                        <div className="relative">
                          <textarea
                            value={project.description}
                            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/25 transition-all duration-300 hover:border-gray-600 resize-none"
                            required
                            placeholder="Describe your project"
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                      
                      {formState.projects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProject(index)}
                          className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-300 flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Remove Project</span>
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addProject}
                    className="flex items-center justify-center space-x-3 w-full py-4 border-2 border-dashed border-gray-600 hover:border-purple-400 rounded-2xl text-purple-300 hover:text-purple-200 font-semibold transition-all duration-300 hover:bg-purple-500/10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Another Project</span>
                  </button>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}