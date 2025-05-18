const axios = require('axios');

const generateAIContent = async ({ name, skills, projects }) => {
  // Fallback content generator
  const generateFallbackContent = () => ({
    bio: `${name} is a skilled ${skills[0]} developer with experience in ${skills.slice(1, 3).join(', ')}.`,
    tagline: `Professional ${skills[0]} developer`,
    projects: projects.map(p => ({
      ...p,
      generatedDescription: p.description || "No description available"
    }))
  });

  try {
    // Try HuggingFace API first
    const bioPrompt = `Write a professional bio for ${name} who is skilled in ${skills.join(', ')}.`;
    const taglinePrompt = `Create a catchy tagline for ${name}, a ${skills[0]} developer.`;
    
    const [bioResponse, taglineResponse] = await Promise.allSettled([
      queryHuggingFace(bioPrompt),
      queryHuggingFace(taglinePrompt)
    ]);

    // Process project descriptions
    const projectsWithDescriptions = await Promise.all(
      projects.map(async project => {
        try {
          const desc = await queryHuggingFace(`Rewrite professionally: "${project.description}"`);
          return {
            ...project,
            generatedDescription: desc || project.description
          };
        } catch {
          return {
            ...project,
            generatedDescription: project.description
          };
        }
      })
    );

    return {
      bio: bioResponse.status === 'fulfilled' && bioResponse.value 
        ? bioResponse.value 
        : `${name} is a skilled ${skills[0]} developer.`,
      tagline: taglineResponse.status === 'fulfilled' && taglineResponse.value 
        ? taglineResponse.value 
        : `Professional ${skills[0]} developer`,
      projects: projectsWithDescriptions
    };
  } catch (error) {
    console.error('AI generation error:', error);
    return generateFallbackContent();
  }
};

const queryHuggingFace = async (prompt) => {
  try {
    // Try smaller model first
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/distilgpt2',
      { inputs: prompt },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY || 'YOUR_DEFAULT_KEY'}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }
    );
    
    if (response.data?.error) {
      throw new Error(response.data.error);
    }
    
    return response.data[0]?.generated_text?.replace(prompt, '')?.trim() || '';
  } catch (error) {
    console.error('HuggingFace API error:', error.message);
    return null;
  }
};

module.exports = { generateAIContent };