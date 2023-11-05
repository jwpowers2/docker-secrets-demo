const jwt = require("jsonwebtoken");

class AuthenticateToken {
  auth(token) {
    let decoded;
    if (token == null) {
      return false;
    } else {
      try {
        decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      } catch (err) {
        decoded = false;
      }
      return decoded;
    }
  }
}
module.exports = new AuthenticateToken();