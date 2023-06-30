// index.js
const express = require('express');
const cors = require('cors');
const passport = require('./passport');
const router = require('./router');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize Passport
app.use(passport.initialize());

// Protected route
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
res.json({ message: 'Protected route accessed!' });
});

// Routes
app.use(router);

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});