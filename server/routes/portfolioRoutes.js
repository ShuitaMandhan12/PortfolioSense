const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const { generateAIContent } = require('../services/aiService');

// Generate portfolio
router.post('/generate', async (req, res) => {
  try {
    const { name, skills, projects, socialLinks } = req.body;
    
    // Validate required fields
    if (!name || !skills || !projects) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, skills, and projects are required'
      });
    }

    // Process skills
    const processedSkills = Array.isArray(skills) 
      ? skills.filter(s => s && s.trim())
      : typeof skills === 'string'
        ? skills.split(',').map(s => s.trim()).filter(s => s)
        : [];

    if (processedSkills.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one valid skill is required'
      });
    }

    // Process projects
    const processedProjects = projects.map(p => ({
      title: p.title?.trim() || 'Untitled Project',
      description: p.description?.trim() || ''
    }));

    // Generate AI content
    const aiContent = await generateAIContent({ 
      name: name.trim(),
      skills: processedSkills,
      projects: processedProjects
    });


    console.log('Creating portfolio:', {
  name,
  skills: processedSkills,
  projects: aiContent.projects
});
    // Create portfolio
    const portfolio = new Portfolio({
      name: name.trim(),
      skills: processedSkills,
      projects: aiContent.projects,
      socialLinks: socialLinks || {},
      generatedContent: {
        bio: aiContent.bio,
        tagline: aiContent.tagline
      },
      uniqueId: require('crypto').randomBytes(4).toString('hex') // More reliable ID
    });

    await portfolio.save();

    res.status(201).json({
      success: true,
      data: portfolio
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get portfolio by ID
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ uniqueId: req.params.id });
    if (!portfolio) {
      return res.status(404).json({ 
        success: false, 
        error: 'Portfolio not found' 
      });
    }
    res.status(200).json({ 
      success: true, 
      data: portfolio 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;