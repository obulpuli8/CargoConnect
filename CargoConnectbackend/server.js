const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); // Database connection configuration
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const protectedRoutes = require('./routes/protected');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded requests

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes (login, register)
app.use('/api', profileRoutes);    // Profile routes (get, update profile)
app.use('/api', protectedRoutes);  // Protected routes

// Testing route
app.get('/', (req, res) => {
  res.send('CargoConnect API is running...');
});

// Sync DB and start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    await sequelize.authenticate();  // Check database connection
    console.log('✅ Connected to MySQL successfully!');
    
    // Synchronize models with database (auto update tables)
    await sequelize.sync({ alter: true });  // Automatically sync models with database (alter tables to reflect changes)
    console.log('📦 All models synced!');
    
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
});
