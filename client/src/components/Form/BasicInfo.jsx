import { useState } from 'react';

export default function BasicInfo({ data, updateData, nextStep }) {
 const [name, setName] = useState(data.name || '');
const [skills, setSkills] = useState(data.skills ? data.skills.join(', ') : '');
  

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!name.trim()) {
    alert('Please enter your name');
    return;
  }
  if (!skills.trim()) {
    alert('Please enter at least one skill');
    return;
  }
  updateData('name', name.trim());
  updateData('skills', skills.split(',').map(s => s.trim()).filter(s => s));
  nextStep();
};
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          required
        />
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          Skills (comma separated)
        </label>
        <input
          type="text"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="e.g., JavaScript, React, Node.js"
          required
        />
      </div>

      <div className="flex justify-end">
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