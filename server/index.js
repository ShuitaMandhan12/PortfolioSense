require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', portfolioRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // List all databases to verify connection
    mongoose.connection.db.admin().listDatabases((err, result) => {
      if (err) {
        console.error('Error listing databases:', err);
        return;
      }
      console.log('Available databases:', result.databases.map(db => db.name));
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
// Basic route
app.get('/', (req, res) => {
  res.send('PortfolioSense API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});