// auth.js
const users = [
    { username: 'admin', password: 'welcome@123' }
    // Additional user objects...
  ];
  
  function loginUser(username, password) {
    // Find the user with the provided username
    const user = users.find(user => user.username === username);
  
    if (!user) {
      // User not found
      return { success: false, message: 'User not found' };
    }
  
    if (user.password !== password) {
      // Incorrect password
      return { success: false, message: 'Incorrect password' };
    }
  
    // Login successful
    return { success: true, message: 'Login successful' };
  }
  
  module.exports = {
    loginUser
  };
  