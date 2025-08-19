// File: /server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);

// File: /server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection failed:', err));




// // auth_backend.js
// const express = require('express');
// const bcrypt = require('bcrypt');
// const session = require('express-session');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const PORT = 3000;

// // MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/jobMatcher', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB Connected'));

// // User schema
// const UserSchema = new mongoose.Schema({
//   email: String,
//   password: String
// });
// const User = mongoose.model('User', UserSchema);

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'secretKey123',
//   resave: false,
//   saveUninitialized: true
// }));

// // Register
// app.post('/api/register', async (req, res) => {
//   const { email, password } = req.body;
//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     return res.json({ success: false, message: 'Email already registered' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ email, password: hashedPassword });
//   await newUser.save();

//   res.json({ success: true, message: 'Registration successful' });
// });

// // Login
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) return res.json({ success: false, message: 'User not found' });

//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) return res.json({ success: false, message: 'Incorrect password' });

//   req.session.userId = user._id;
//   res.json({ success: true, message: 'Login successful' });
// });

// // Middleware to check auth
// function isAuthenticated(req, res, next) {
//   if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });
//   next();
// }

// // Resume Matcher (Protected Route)
// const upload = multer({ dest: 'uploads/' });
// app.post('/api/resume-match', isAuthenticated, upload.single('resume'), (req, res) => {
//   const filePath = path.join(__dirname, req.file.path);
//   const fileContent = fs.readFileSync(filePath, 'utf8');

//   // Example logic: count words as score
//   const score = fileContent.split(/\s+/).length;

//   // Clean up uploaded file
//   fs.unlinkSync(filePath);

//   res.json({ score });
// });

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
