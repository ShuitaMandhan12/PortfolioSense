const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  projects: [{
    title: String,
    description: String,
    generatedDescription: String
  }],
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String
  },
  generatedContent: {
    bio: String,
    tagline: String
  },
  uniqueId: { type: String, unique: true }
}, 
{collection: 'portfolios',
timestamps: true });
portfolioSchema.index({ uniqueId: 1 }, { unique: true });
module.exports = mongoose.model('Portfolio', portfolioSchema);