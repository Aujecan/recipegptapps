// router.js
const express = require('express');
const passport = require('./passport');
const { loginUser, signup } = require('./auth');

const router = express.Router();

router.post('/login', async (req, res) => {
const { email, password } = req.body;

const result = await loginUser(email, password);

res.status(result.status).json({ message: result.message, token: result.token });
});

router.post('/signup', async (req, res) => {
const { email, password } = req.body;

const result = await signup(email, password);

res.status(result.status).json({ message: result.message });
});

module.exports = router;