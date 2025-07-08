require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const rentalRoutes = require('./routes/rentals');
const analyticsRoutes = require('./routes/analytics');
const notificationRoutes = require('./routes/notifications');
const paymentRoutes = require('./routes/payments');
const geocodeRoutes = require('./routes/geocode');
const scrapeRoutes = require('./routes/scrape');
// Add other route imports as you implement them

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/geocode', geocodeRoutes);
app.use('/api/scrape', scrapeRoutes);
// Mount other routes here

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 