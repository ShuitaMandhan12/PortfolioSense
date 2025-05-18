import { useState } from 'react';

export default function Projects({ data, updateData, prevStep, nextStep }) {
  const [projects, setProjects] = useState(
  data.projects && data.projects.length > 0 
    ? data.projects 
    : [{ title: '', description: '' }]
);
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: '', description: '' }]);
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const validProjects = projects.filter(p => 
    p.title.trim() && p.description.trim()
  );
  if (validProjects.length === 0) {
    alert('Please add at least one project with title and description');
    return;
  }
  updateData('projects', validProjects);
  nextStep();
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Your Projects</h2>
      
      {projects.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-md p-4">
          <div className="mb-4">
            <label htmlFor={`project-title-${index}`} className="block text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              id={`project-title-${index}`}
              value={project.title}
              onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor={`project-desc-${index}`} className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id={`project-desc-${index}`}
              value={project.description}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              required
            />
          </div>

          {projects.length > 1 && (
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="text-red-600 text-sm font-medium hover:text-red-800"
            >
              Remove Project
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        + Add Another Project
      </button>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </button>
      </div>
    </form>
  );
}