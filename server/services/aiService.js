const axios = require('axios');

const generateAIContent = async (portfolioData) => {
  const { personalInfo, skills, projects } = portfolioData;
  const name = personalInfo?.fullName || 'The candidate';
  
  // Fallback content generator
  const generateFallbackContent = () => ({
    bio: `${name} is a skilled ${skills[0] || 'software'} developer with experience in ${skills.slice(1, 3).join(', ') || 'various technologies'}.`,
    tagline: `Professional ${skills[0] || 'software'} developer`,
    projects: projects.map(p => ({
      ...p,
      generatedDescription: p.description || "No description available"
    }))
  });

  try {
    // Try HuggingFace API first
    const bioPrompt = `Write a 100-word professional bio for ${name} who is skilled in ${skills.join(', ') || 'software development'}.`;
    const taglinePrompt = `Create a catchy 5-7 word tagline for ${name}, a ${skills[0] || 'software'} developer.`;
    
    const [bioResponse, taglineResponse] = await Promise.allSettled([
      queryHuggingFace(bioPrompt),
      queryHuggingFace(taglinePrompt)
    ]);

    // Process project descriptions
    const projectsWithDescriptions = await Promise.all(
      projects.map(async project => {
        try {
          const desc = await queryHuggingFace(
            `Rewrite this project description professionally in 2-3 sentences: "${project.description}"`
          );
          return {
            ...project,
            generatedDescription: desc || project.description
          };
        } catch {
          return project;
        }
      })
    );

    return {
      bio: bioResponse.status === 'fulfilled' && bioResponse.value 
        ? bioResponse.value 
        : generateFallbackContent().bio,
      tagline: taglineResponse.status === 'fulfilled' && taglineResponse.value 
        ? taglineResponse.value 
        : generateFallbackContent().tagline,
      projects: projectsWithDescriptions
    };
  } catch (error) {
    console.error('AI generation error:', error);
    return generateFallbackContent();
  }
};

const queryHuggingFace = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/gpt2',
      { inputs: prompt },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 8000
      }
    );
    
    if (response.data?.error) {
      throw new Error(response.data.error);
    }
    
    return response.data[0]?.generated_text?.replace(prompt, '')?.trim() || null;
  } catch (error) {
    console.error('HuggingFace API error:', error.message);
    return null;
  }
};

module.exports = { generateAIContent };