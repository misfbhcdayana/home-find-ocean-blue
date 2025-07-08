const { auth: adminAuth, db } = require('../firebase');
const jwt = require('jsonwebtoken');

// Helper to generate JWT
function generateToken(user) {
  return jwt.sign(
    {
      uid: user.uid,
      email: user.email,
      role: user.role || 'user',
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Register
exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    // Create user in Firebase Auth
    const userRecord = await adminAuth.createUser({ email, password });
    // Create user profile in Firestore
    const userProfile = {
      email,
      name: '',
      profilePicture: '',
      preferences: {},
      role: 'user',
      createdAt: new Date(),
    };
    await db.collection('users').doc(userRecord.uid).set(userProfile);
    // Generate JWT
    const token = generateToken({ uid: userRecord.uid, email, role: 'user' });
    res.json({ userId: userRecord.uid, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login (should be handled on the frontend with Firebase client SDK)
exports.login = async (req, res) => {
  res.status(400).json({ error: 'Login should be handled on the frontend using Firebase client SDK.' });
};

// Forgot Password (should be handled on the frontend with Firebase client SDK)
exports.forgotPassword = async (req, res) => {
  res.status(400).json({ error: 'Password reset should be handled on the frontend using Firebase client SDK.' });
};

// Get User Profile
exports.getUser = async (req, res) => {
  const uid = req.user.uid;
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) return res.status(404).json({ error: 'User not found' });
    const userData = userDoc.data();
    res.json({ userData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 