const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from any origin
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies and credentials
};


app.use(cors(corsOptions)); // Use the configured CORS options
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

// Handle preflight OPTIONS requests (for non-GET/POST methods)
app.options('*', cors(corsOptions));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err));
