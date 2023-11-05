const jwt = require("jsonwebtoken");
const secrets = require('../../secrets')
class GenerateAccessToken {
  jwt(username) {
    return jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 200000, data: username },
      secrets.read('/run/secrets/TOKEN_SECRET')
    );
  }
}
module.exports = new GenerateAccessToken();
