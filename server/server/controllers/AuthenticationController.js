let models = require("../models/models");
var validJwts = require("../jwt/validJwts");
const GenerateAccessToken = require("../jwt/GenerateAccessToken");
const AuthenticateToken = require("../jwt/AuthenticateToken");
const GarbageCollectToken = require("../jwt/GarbageCollectToken");
const bcrypt = require("bcryptjs");

setInterval(() => {
  GarbageCollectToken.collect(validJwts);
}, 5000);

class AuthenticationController {
  login(req, res) {
    models.Contributor.findOne({
      where: {
        email: req.body.email
      }
    }).then(contributor => {
      if (contributor) {
        bcrypt
          .compare(req.body.password, contributor.dataValues.password)
          .then(isValidPassword => {
            if (isValidPassword === true) {
              const token = GenerateAccessToken.jwt(contributor.email);
              validJwts[token] = "";
              res.json({
                message: { token, role: contributor.role, id: contributor.id },
                error: ""
              });
            } else {
              res.json({
                message: "",
                error: "bad credentials, can't issue jwt token"
              });
            }
          });
      } else {
        res.json({
          message: "",
          error: "no user found"
        });
      }
    });
  }
  logout(req, res) {
    if (req.body.token in validJwts) {
      delete validJwts[req.body.token];
      res.json({ message: "logout successful", error: "" });
    } else {
      res.json({ message: "", error: "logout failed, did not find token" });
    }
  }
  validate(req, res) {
    if (req.body.token in validJwts) {
      res.json({ message: "valid", error: "" });
    } else {
      res.json({ message: "", error: "invalid" });
    }
  }
}
module.exports = new AuthenticationController();
