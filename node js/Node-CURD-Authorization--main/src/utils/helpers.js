require("dotenv").config();
const jwt = require("jsonwebtoken");

// const privateKey = process.env.JWT_PRIVATE_KEY;
// console.log(privateKey)
privateKey = 'secret'
const generateAuthToken = ({ username, email }) =>
  jwt.sign({ username, email }, privateKey);

const verifyAuthToken = (token) => jwt.verify(token, privateKey);

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
