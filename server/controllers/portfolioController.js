const Portfolio = require('../models/Portfolio');
const { generateAIContent } = require('../services/aiService');
const { v4: uuidv4 } = require('uuid');

// Create a new portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const portfolioData = req.body;
    const uniqueId = uuidv4();
    
    // Generate AI content
    const generatedContent = await generateAIContent(portfolioData);
    
    const portfolio = new Portfolio({
      ...portfolioData,
      generatedContent,
      uniqueId
    });

    await portfolio.save();
    
    res.status(201).json({
      success: true,
      data: {
        uniqueId,
        portfolio
      }
    });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get portfolio by ID
exports.getPortfolio = async (req, res) => {
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
    console.error('Error getting portfolio:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Generate portfolio (AI)
exports.generatePortfolio = async (req, res) => {
  try {
    const portfolioData = req.body;
    const generatedContent = await generateAIContent(portfolioData);
    
    res.status(200).json({
      success: true,
      data: {
        ...portfolioData,
        generatedContent
      }
    });
  } catch (error) {
    console.error('Error generating portfolio:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate portfolio content'
    });
  }
};