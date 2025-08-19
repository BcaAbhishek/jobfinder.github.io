// // // File: /server/server.js
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const dotenv = require('dotenv');
// // const cors = require('cors');

// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Middlewares
// // app.use(cors());
// // app.use(express.json());

// // // Routes
// // const authRoutes = require('./routes/auth');
// // app.use('/api/auth', authRoutes);

// // // Connect to MongoDB and start server
// // mongoose
// //   .connect(process.env.MONGO_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => {
// //     console.log('✅ MongoDB connected');
// //     app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// //   })
// //   .catch((err) => console.error('❌ MongoDB connection failed:', err));






//   require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect DB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// // Routes
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const protectedRoutes = require('./routes/protectedRoutes');
// app.use('/api', protectedRoutes);



// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Fake user database (in memory)
const users = [];

// Signup route
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  users.push({ email, password });
  res.status(201).json({ message: 'Signup successful. You can now log in.' });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found. Please sign up.' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.status(200).json({ message: 'Login successful' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const path = require('path');

// Add this at the bottom of your index.js
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(express.static(path.join(__dirname, 'public')));

