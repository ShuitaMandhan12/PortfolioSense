import { useState } from 'react';

export default function SocialLinks({ data, updateData, prevStep, onSubmit, isLoading }) {
  // Initialize with empty strings if undefined
  const [socialLinks, setSocialLinks] = useState({
    github: data.socialLinks?.github || '',
    linkedin: data.socialLinks?.linkedin || '',
    twitter: data.socialLinks?.twitter || ''
  });

  const handleChange = (field, value) => {
    setSocialLinks(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData('socialLinks', socialLinks);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="github" className="block text-sm font-medium text-gray-700">
          GitHub URL
        </label>
        <input
          type="url"
          id="github"
          value={socialLinks.github}
          onChange={(e) => handleChange('github', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="https://github.com/yourusername"
        />
      </div>

      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
          LinkedIn URL
        </label>
        <input
          type="url"
          id="linkedin"
          value={socialLinks.linkedin}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <div>
        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
          Twitter URL
        </label>
        <input
          type="url"
          id="twitter"
          value={socialLinks.twitter}
          onChange={(e) => handleChange('twitter', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="https://twitter.com/yourhandle"
        />
      </div>

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
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Portfolio'}
        </button>
      </div>
    </form>
  );
}