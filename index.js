const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Import the loginUser function from auth.js
const { loginUser } = require('./auth');


// Define the login route
app.use(express.json());
app.post('/login', (req, res) => {

  console.log(req)
  const { email, password } = req.body; // Assuming username and password are sent in the request body

  const loginResult = loginUser(email, password);

  if (loginResult.success) {
    // Login successful
    res.status(200).json({ message: "Login successful" });
  } else {
    // Login failed
    res.status(401).json({ message: "Login failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});