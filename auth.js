// auth.js
const bcrypt = require('bcrypt');
const User = require('./models/user');
const { connect, close, client } = require('./dbcon');
const jwt = require('jsonwebtoken');
const config = require('./config')

// Login user
async function loginUser(email, password) {
  try {
    await connect();// Connect to the database
    const database = client.db('mycluster1'); // Replace with your database name
    const collection = database.collection('users'); // Replace with your collection name

    const user = await collection.findOne({ email : email });

    console.log(user)

    if (!user) {
      return { status: 401, message: 'User not found' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 401, message: 'Invalid password' };
    }

    const token = generateToken(email);

    return { status: 200, token };
  } catch (error) {
    console.error(error);
    return { status: 500, message: 'Internal server error' };
  } finally {
    close(); // Close the database connection
  }
}

async function signup(email, password) {
  try {
    await connect();
    const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new User({ email : email, password: hashedPassword });
    // await newUser.save();
    const database = client.db('mycluster1'); // Replace with your database name
    const collection = database.collection('users'); // Replace with your collection name

    await collection.insertOne({ email : email, password : hashedPassword });

    const token = generateToken(email);
    
    return { status: 200, message : token };
  } catch (error) {
    console.error('Failed to insert data:', error);
    return { status: 500, message: 'Failed to insert data' };
  } finally {
    close(); // Close the database connection
  }
}

function generateToken(email) {
  const token = jwt.sign({email}, config.jwtSecret, { expiresIn: '1h' });
  return token;
}


module.exports = {
  loginUser,
  signup
};