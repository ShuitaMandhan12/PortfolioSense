const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  personalInfo: {
    fullName: { type: String, required: true },
    professionalTitle: String,
    bio: String
  },
  skills: { type: [String], required: true },
  projects: [{
    title: String,
    description: String,
    generatedDescription: String,
    technologies: [String]
  }],
  workExperience: [{
    jobTitle: String,
    company: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    startYear: String,
    endYear: String
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
  uniqueId: { type: String, unique: true, required: true }
}, {
  timestamps: true
});

portfolioSchema.index({ uniqueId: 1 }, { unique: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);