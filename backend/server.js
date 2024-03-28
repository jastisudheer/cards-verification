require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Include CORS
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware to allow cross-origin requests
app.use(cors()); // Use CORS with default settings (Allow all origins)

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
